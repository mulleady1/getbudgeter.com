"""AI-powered receipt processing using Claude API"""

import base64
import json
import logging
import os
from datetime import datetime
from decimal import Decimal
from pathlib import Path

import anthropic
from anthropic.types import Base64ImageSourceParam, ImageBlockParam, MessageParam, TextBlock, TextBlockParam

logger = logging.getLogger(__name__)


class AIReceiptProcessor:
    """Process receipt images using Claude AI to extract structured data"""

    def __init__(self):
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is required")
        self.client = anthropic.Anthropic(api_key=self.api_key)

    def process_receipt(self, image_path: str) -> dict:
        """
        Process a receipt image using Claude AI to extract structured data.

        Args:
            image_path: Path to the receipt image file

        Returns:
            Dictionary containing:
            - merchant: Extracted merchant name
            - date: Extracted date
            - total: Extracted total amount
            - items: List of line items with descriptions and amounts
        """
        try:
            # Read and encode image
            image_data = self._encode_image(image_path)
            media_type = self._get_media_type(image_path)

            # Prepare the prompt for Claude
            prompt = """Analyze this receipt image and extract the following information in a structured format:

1. Merchant name (the store/restaurant name at the top)
2. Transaction date (in YYYY-MM-DD format)
3. Individual line items with their descriptions and prices
4. Total amount

Please respond with ONLY a JSON object in this exact format (no markdown, no code blocks):
{
    "merchant": "Store Name",
    "date": "YYYY-MM-DD",
    "total": "0.00",
    "items": [
        {"description": "Item 1", "amount": "0.00"},
        {"description": "Item 2", "amount": "0.00"}
    ]
}

Important rules:
- Extract ALL line items from the receipt, not just a few examples
- Do NOT include tax, subtotal, or total lines as items
- Only include actual purchased items
- Amounts should be numbers without $ symbol
- If you cannot determine a field, use reasonable defaults:
  - merchant: "Unknown"
  - date: today's date
  - total: sum of all items if not found
- Ensure the JSON is valid and properly formatted"""

            # Call Claude API with properly typed parameters
            # Cast media_type to the correct literal type for type checking
            image_source: Base64ImageSourceParam = {
                "type": "base64",
                "media_type": media_type,  # type: ignore
                "data": image_data,
            }

            image_block: ImageBlockParam = {
                "type": "image",
                "source": image_source,
            }

            text_block: TextBlockParam = {
                "type": "text",
                "text": prompt,
            }

            user_message: MessageParam = {
                "role": "user",
                "content": [image_block, text_block],
            }

            message = self.client.messages.create(
                model="claude-sonnet-4-6",
                max_tokens=4096,
                messages=[user_message],
            )

            # Parse the response
            # Extract text from the first content block
            first_content = message.content[0]
            if not isinstance(first_content, TextBlock):
                raise ValueError("Expected text content in response")

            response_text = first_content.text.strip()
            logger.info("Claude API response: %s", response_text)

            # Parse JSON response
            try:
                data = json.loads(response_text)
            except json.JSONDecodeError:
                # Try to extract JSON from response if it's wrapped in markdown
                if "```json" in response_text:
                    json_str = response_text.split("```json")[1].split("```")[0].strip()
                    data = json.loads(json_str)
                elif "```" in response_text:
                    json_str = response_text.split("```")[1].split("```")[0].strip()
                    data = json.loads(json_str)
                else:
                    raise

            # Validate and convert data types
            merchant = str(data.get("merchant", "Unknown"))[:255]
            date_str = data.get("date")
            total = Decimal(str(data.get("total", "0.00")))

            # Parse date
            date = None
            if date_str:
                try:
                    date = datetime.strptime(date_str, "%Y-%m-%d").date()
                except ValueError:
                    logger.warning("Failed to parse date: %s", date_str)
                    date = datetime.now().date()
            else:
                date = datetime.now().date()

            # Parse items
            items = []
            for item_data in data.get("items", []):
                try:
                    description = str(item_data.get("description", ""))[:500]
                    amount = Decimal(str(item_data.get("amount", "0.00")))
                    if description and amount > 0:
                        items.append({"description": description, "amount": amount})
                except (ValueError, KeyError) as e:
                    logger.warning("Failed to parse item: %s, error: %s", item_data, e)
                    continue

            # If total is 0, sum up items
            if total == 0 and items:
                total = sum(item["amount"] for item in items)

            logger.info(
                "AI processed receipt: merchant=%s, date=%s, items=%d, total=$%s",
                merchant,
                date,
                len(items),
                total,
            )

            return {
                "merchant": merchant,
                "date": date,
                "total": total,
                "items": items,
            }

        except Exception as e:
            logger.error("Error processing receipt with AI: %s", str(e), exc_info=True)
            raise

    def _encode_image(self, image_path: str) -> str:
        """Encode image to base64 string"""
        with open(image_path, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode("utf-8")

    def _get_media_type(self, image_path: str) -> str:
        """Get the media type based on file extension"""
        extension = Path(image_path).suffix.lower()
        media_types = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".webp": "image/webp",
        }
        return media_types.get(extension, "image/jpeg")
