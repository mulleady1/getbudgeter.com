"""Normalize raw receipt line items into canonical names and coarse categories.

Stores abbreviate wildly — "GV HNY NUT CHRIOS 12OZ" and "HONEY NUT CHEERIOS" are
the same box of cereal, but grouping on the raw text treats them as two products.
This maps each raw line to a canonical name (so repeat purchases group) plus one
category from `app.taxonomy` (so "how much on cereal this year" is answerable).

Every mapping is cached in ItemAlias, so a description is only ever sent to the
API once per user.
"""

import logging
import os
import re
from dataclasses import dataclass

import anthropic

from ..models import ItemAlias
from ..taxonomy import PRODUCT_CATEGORIES, UNCATEGORIZED

logger = logging.getLogger(__name__)

MODEL = "claude-sonnet-5"
# Items per API call. Large enough that a weekly grocery run is a single request.
BATCH_SIZE = 100
MAX_NAME_LENGTH = 255

_WHITESPACE = re.compile(r"\s+")


@dataclass(frozen=True)
class NormalizedItem:
    name: str
    category: str


def alias_key(description):
    """Collapse a raw description to its cache lookup key.

    Case and whitespace vary between scans of the same product, so they must not
    produce separate cache entries.
    """
    return _WHITESPACE.sub(" ", description or "").strip().lower()[:500]


NORMALIZE_TOOL = {
    "name": "record_normalized_items",
    "description": "Record the canonical product name and category for every receipt line item.",
    "input_schema": {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "description": "One entry per line item in the input list.",
                "items": {
                    "type": "object",
                    "properties": {
                        "index": {
                            "type": "integer",
                            "description": "The line item's number from the input list.",
                        },
                        "normalized_name": {
                            "type": "string",
                            "description": "Canonical product name, e.g. 'Honey Nut Cheerios'.",
                        },
                        "product_category": {
                            "type": "string",
                            "enum": PRODUCT_CATEGORIES,
                            "description": "The single best-fitting category.",
                        },
                    },
                    "required": ["index", "normalized_name", "product_category"],
                },
            }
        },
        "required": ["items"],
    },
}

PROMPT = """Every store abbreviates receipt line items differently. Rewrite each line below as a canonical product name and assign it a category.

Rules for the canonical name:
- Expand store abbreviations into normal words: "GV HNY NUT CHRIOS 12OZ" becomes "Honey Nut Cheerios".
- Include the brand when it is identifiable, otherwise name just the product.
- Drop sizes, weights, quantities, unit prices, and store SKUs.
- Use title case, and use the same name every time for the same product so purchases group together across stores.
- If a line is too garbled to identify, just fix its spacing and capitalization.

Categories, use exactly one of these strings:
{categories}

Line items:
{items}

Return one entry per line item, using the item's number as `index`."""


class ItemNormalizer:
    """Maps a user's raw receipt descriptions to canonical names and categories."""

    def __init__(self, user):
        self.user = user
        self._client = None

    @property
    def client(self):
        if self._client is None:
            api_key = os.getenv("ANTHROPIC_API_KEY")
            if not api_key:
                raise ValueError("ANTHROPIC_API_KEY environment variable is required")
            self._client = anthropic.Anthropic(api_key=api_key)
        return self._client

    def normalize(self, descriptions):
        """Return {raw description: NormalizedItem} for the descriptions given.

        Cached descriptions are resolved without an API call; the rest are sent to
        Claude in batches and written back to the cache. Descriptions the model
        fails on are simply absent from the result — callers keep the raw text.
        """
        # Distinct keys only: a shopping trip repeats the same items constantly.
        first_seen = {}
        for description in descriptions:
            key = alias_key(description)
            if key:
                first_seen.setdefault(key, description)

        if not first_seen:
            return {}

        resolved = {
            alias.raw_description: NormalizedItem(alias.normalized_name, alias.product_category)
            for alias in ItemAlias.objects.filter(
                user=self.user, raw_description__in=list(first_seen)
            )
        }

        misses = [key for key in first_seen if key not in resolved]
        for start in range(0, len(misses), BATCH_SIZE):
            batch = misses[start : start + BATCH_SIZE]
            try:
                resolved.update(self._ask_claude({key: first_seen[key] for key in batch}))
            except Exception as e:
                # Normalization is an enhancement — a failure must not cost the
                # caller its receipt. Leave these items unnormalized and move on.
                logger.error(
                    "Item normalization failed for %d description(s): %s", len(batch), e, exc_info=True
                )

        return {
            description: resolved[key]
            for description in descriptions
            if (key := alias_key(description)) in resolved
        }

    def set_override(self, description, normalized_name, product_category):
        """Pin a mapping by hand, overriding whatever the AI produced."""
        if product_category not in PRODUCT_CATEGORIES:
            product_category = UNCATEGORIZED

        alias, _ = ItemAlias.objects.update_or_create(
            user=self.user,
            raw_description=alias_key(description),
            defaults={
                "normalized_name": normalized_name.strip()[:MAX_NAME_LENGTH],
                "product_category": product_category,
                "is_user_override": True,
            },
        )
        return NormalizedItem(alias.normalized_name, alias.product_category)

    def _ask_claude(self, batch):
        """Normalize one batch of {key: raw description}; returns {key: NormalizedItem}."""
        keys = list(batch)
        numbered = "\n".join(f"{index}. {batch[key]}" for index, key in enumerate(keys))

        message = self.client.messages.create(
            model=MODEL,
            max_tokens=8192,
            tools=[NORMALIZE_TOOL],
            # Forces a schema-shaped tool_use block, so there is no prose or
            # markdown fence to parse out of the response.
            tool_choice={"type": "tool", "name": NORMALIZE_TOOL["name"]},
            messages=[
                {
                    "role": "user",
                    "content": PROMPT.format(
                        categories="\n".join(f"- {name}" for name in PRODUCT_CATEGORIES),
                        items=numbered,
                    ),
                }
            ],
        )

        tool_use = next((block for block in message.content if block.type == "tool_use"), None)
        if tool_use is None:
            raise ValueError("Model returned no tool_use block")

        results = {}
        for entry in tool_use.input.get("items", []):
            index = entry.get("index")
            if not isinstance(index, int) or not 0 <= index < len(keys):
                logger.warning("Normalizer returned out-of-range index %r", index)
                continue

            name = (entry.get("normalized_name") or "").strip()
            if not name:
                continue

            # The enum is a hint, not a guarantee, without strict tool use.
            category = entry.get("product_category")
            if category not in PRODUCT_CATEGORIES:
                logger.warning("Normalizer returned unknown category %r", category)
                category = UNCATEGORIZED

            results[keys[index]] = NormalizedItem(name[:MAX_NAME_LENGTH], category)

        missing = len(keys) - len(results)
        if missing:
            logger.warning("Normalizer returned no mapping for %d of %d items", missing, len(keys))

        self._save_aliases(results)
        return results

    def _save_aliases(self, results):
        if not results:
            return
        # ignore_conflicts covers two receipts normalizing the same new item
        # concurrently, and never clobbers an existing user override.
        ItemAlias.objects.bulk_create(
            [
                ItemAlias(
                    user=self.user,
                    raw_description=key,
                    normalized_name=item.name,
                    product_category=item.category,
                )
                for key, item in results.items()
            ],
            ignore_conflicts=True,
        )
