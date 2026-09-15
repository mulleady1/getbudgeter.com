"""Template loaders that stamp CSP nonces onto htmx elements and inline scripts.

The page ships a nonce-based ``script-src`` policy (see ``SECURE_CSP`` in settings) and the
``hx-csp`` htmx extension. Under that setup:

* every ``<script>`` needs ``nonce="<page nonce>"`` or the browser refuses to run it, and
* every element carrying an ``hx-*`` attribute needs ``hx-nonce="<page nonce>"`` or hx-csp strips
  its htmx attributes and leaves it inert.

Writing those by hand on every element is burdensome and easy to forget, so the loaders below
do it once per template, on the template *source*, before Django compiles it. Each start tag
with an ``hx-*`` attribute gets ``hx-nonce="{{ csp_nonce }}"`` and each ``<script>`` tag gets
``nonce="{{ csp_nonce }}"``. The ``csp_nonce`` variable comes from Django's
``django.template.context_processors.csp`` and matches the header the CSP middleware sends.

Stamping the source, not the rendered output, is what keeps this safe: context variables are
rendered *after* stamping, so markup that arrives through user data can never pick up a valid
nonce. Only markup that was literally written in a template file gets one.
"""

import re

from django.template.loaders import app_directories, filesystem

NONCE_VAR = "{{ csp_nonce }}"
HX_NONCE_ATTR = f' hx-nonce="{NONCE_VAR}"'
SCRIPT_NONCE_ATTR = f' nonce="{NONCE_VAR}"'

# Attribute prefixes hx-csp gates on: `hx-` plus htmx's secondary `data-hx-` prefix.
HTMX_ATTR_PREFIXES = ("hx-", "data-hx-")

# Places where scanning should jump to next: a Django template token, an HTML comment, or a
# start tag. Everything in between is plain text and copied through untouched.
_INTERESTING_RE = re.compile(r"\{[%{#]|<!--|<[A-Za-z]")
_TAG_NAME_RE = re.compile(r"[A-Za-z][^\s/>]*")
_SCRIPT_CLOSE_RE = re.compile(r"</script\s*>", re.IGNORECASE)
_TEMPLATE_TOKEN_CLOSERS = {"{%": "%}", "{{": "}}", "{#": "#}"}


def stamp_nonces(source: str) -> str:
    """Return ``source`` with nonce attributes added to htmx elements and script tags.

    Django template tokens (``{% %}``, ``{{ }}``, ``{# #}``) are treated as opaque wherever
    they appear, including inside start tags, so tags like
    ``<a {% if x %}hx-get="/y"{% endif %}>`` are handled. No newlines are added, so template
    error line numbers stay accurate.
    """
    out = []
    i = 0
    n = len(source)
    while i < n:
        match = _INTERESTING_RE.search(source, i)
        if not match:
            out.append(source[i:])
            break
        start = match.start()
        out.append(source[i:start])
        token = match.group()

        if token in _TEMPLATE_TOKEN_CLOSERS:
            end = _skip_template_token(source, start)
        elif token == "<!--":
            close = source.find("-->", start + 4)
            end = n if close == -1 else close + 3
        else:
            end = _find_tag_end(source, start)
            tag = source[start:end]
            stamped, name = _stamp_tag(tag)
            out.append(stamped)
            if name.lower() == "script" and not tag.endswith("/>"):
                # Copy the script body through verbatim: JS may legitimately contain `<` or
                # HTML-looking strings, and nothing in there should be stamped.
                close = _SCRIPT_CLOSE_RE.search(source, end)
                end = n if not close else close.end()
                out.append(source[_find_tag_end(source, start):end])
            i = end
            continue

        out.append(source[start:end])
        i = end
    return "".join(out)


def _is_template_token_start(text: str, i: int) -> bool:
    return text[i] == "{" and i + 1 < len(text) and text[i + 1] in "%{#"


def _skip_template_token(text: str, i: int) -> int:
    """Given ``i`` at the start of a template token, return the index just past its closer."""
    closer = _TEMPLATE_TOKEN_CLOSERS[text[i : i + 2]]
    close = text.find(closer, i + 2)
    return len(text) if close == -1 else close + len(closer)


def _find_tag_end(text: str, start: int) -> int:
    """Given ``start`` at ``<`` of a start tag, return the index just past its closing ``>``.

    Skips quoted attribute values and template tokens, both of which may contain ``>``.
    """
    n = len(text)
    i = start + 1
    quote = None
    while i < n:
        ch = text[i]
        if _is_template_token_start(text, i):
            i = _skip_template_token(text, i)
            continue
        if quote:
            if ch == quote:
                quote = None
        elif ch in "\"'":
            quote = ch
        elif ch == ">":
            return i + 1
        i += 1
    return n


def _attribute_names(body: str) -> list[str]:
    """Lower-cased attribute names found in a start tag's body (everything after the tag name).

    Attribute values, quoted or not, and template tokens are skipped so nothing inside them is
    mistaken for a name.
    """
    names = []
    n = len(body)
    i = 0
    while i < n:
        ch = body[i]
        if _is_template_token_start(body, i):
            i = _skip_template_token(body, i)
        elif ch.isspace() or ch in "/>":
            i += 1
        else:
            j = i
            while j < n and not body[j].isspace() and body[j] not in "=\"'/>" and not _is_template_token_start(body, j):
                j += 1
            if j > i:
                names.append(body[i:j].lower())
            i = j
            # Consume `= value` if present so the value is never read as a name.
            k = i
            while k < n and body[k].isspace():
                k += 1
            if k < n and body[k] == "=":
                k += 1
                while k < n and body[k].isspace():
                    k += 1
                if k < n and body[k] in "\"'":
                    close = body.find(body[k], k + 1)
                    k = n if close == -1 else close + 1
                elif k < n and _is_template_token_start(body, k):
                    k = _skip_template_token(body, k)
                else:
                    while k < n and not body[k].isspace() and body[k] != ">":
                        k += 1
                i = k
            elif j == i:
                # A stray quote or `=`: step over it so the loop always advances.
                i += 1
    return names


def _stamp_tag(tag: str) -> tuple[str, str]:
    """Stamp one start tag. Returns ``(stamped_tag, tag_name)``."""
    name_match = _TAG_NAME_RE.match(tag, 1)
    if not name_match:
        return tag, ""
    name = name_match.group()
    head_end = name_match.end()
    body = tag[head_end:]
    names = _attribute_names(body)

    additions = ""
    if name.lower() == "script" and "nonce" not in names:
        additions += SCRIPT_NONCE_ATTR
    if "hx-nonce" not in names and any(a.startswith(HTMX_ATTR_PREFIXES) for a in names):
        additions += HX_NONCE_ATTR
    if not additions:
        return tag, name
    return tag[:head_end] + additions + body, name


class NonceStampingMixin:
    """Stamp nonce attributes onto template source as it is read from disk."""

    def get_contents(self, origin):
        return stamp_nonces(super().get_contents(origin))  # type: ignore[misc]


class FilesystemLoader(NonceStampingMixin, filesystem.Loader):
    pass


class AppDirectoriesLoader(NonceStampingMixin, app_directories.Loader):
    pass
