"""Generate display-sized copies of receipt images for the list views.

The receipt grid lays out cards at `minmax(300px, 1fr)`, so a card image is never
more than ~450 CSS px wide, while the originals are phone camera photos an order
of magnitude larger. Serving the originals there means downloading megabytes per
card to throw most of the pixels away in `object-fit: cover`.

Originals are never touched: they're the OCR source and what the detail view
links to at full size.
"""

import logging
import os
from io import BytesIO

from PIL import Image, ImageOps
from django.core.files.base import ContentFile

logger = logging.getLogger(__name__)

# Twice the widest card the grid can produce, so the thumbnail still looks sharp
# on a 2x display.
THUMBNAIL_WIDTH = 900

# Must match `aspect-ratio` on .receipt-card-image in receipts_page.css. The card
# crops to this ratio with `object-fit: cover` anyway, so cropping here instead
# means the pixels we ship are the pixels that get shown. Fitting to a square
# bounding box would be worse: a 881x4080 receipt comes out 194px wide, which the
# card then has to upscale to fill 400px.
CARD_ASPECT = 4 / 3
THUMBNAIL_QUALITY = 82


def build_thumbnail(image_field):
    """Return a ContentFile holding a JPEG thumbnail of `image_field`.

    Raises whatever Pillow raises if the file is unreadable — callers decide
    whether a missing thumbnail is fatal (it isn't; the views fall back to the
    original).
    """
    with Image.open(image_field.path) as img:
        # JPEGs can be decoded straight to a smaller size by the DCT scaler, which
        # is several times faster than decoding full size and resampling down. The
        # hint is square because the target dimensions aren't known until the EXIF
        # rotation below has been applied, and draft() only ever picks a scale that
        # leaves the image at least this big.
        img.draft("RGB", (THUMBNAIL_WIDTH, THUMBNAIL_WIDTH))

        # Phone cameras record orientation in EXIF rather than rotating the pixels.
        # Browsers honor that tag when they show the original, but Pillow hands us
        # the raw buffer, so skipping this leaves thumbnails of upright receipts
        # lying on their side in the grid while the detail view looks correct.
        # It has to happen before the dimensions below are read: on a 90-degree
        # rotation it swaps them.
        img = ImageOps.exif_transpose(img)

        # Never enlarge: a source narrower than the target would only produce a
        # bigger file than the original for no extra detail.
        width = min(THUMBNAIL_WIDTH, img.width)
        size = (width, round(width / CARD_ASPECT))

        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            flattened = Image.new("RGB", img.size, (255, 255, 255))
            flattened.paste(img, mask=img.split()[-1])
            img = flattened
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Cropped from the top: on a receipt that's the merchant name and date,
        # which is what makes a card recognizable at a glance.
        img = ImageOps.fit(img, size, method=Image.LANCZOS, centering=(0.5, 0.0))

        buffer = BytesIO()
        img.save(buffer, format="JPEG", quality=THUMBNAIL_QUALITY, optimize=True)

    return ContentFile(buffer.getvalue())


def thumbnail_name(image_field):
    """Name for the derivative file: the original's basename, always .jpg."""
    stem = os.path.splitext(os.path.basename(image_field.name))[0]
    return f"{stem}.jpg"


def generate_thumbnail(receipt, save=True):
    """Build and attach a thumbnail to `receipt`. Returns True if one was written.

    Never raises: a receipt without a thumbnail still renders, just from the
    original, so a corrupt or unreadable upload shouldn't take down the caller.
    """
    if not receipt.image:
        return False

    try:
        content = build_thumbnail(receipt.image)
    except Exception as e:
        logger.error("Thumbnail generation failed for receipt %s: %s", receipt.pk, e, exc_info=True)
        return False

    receipt.thumbnail.save(thumbnail_name(receipt.image), content, save=save)
    return True
