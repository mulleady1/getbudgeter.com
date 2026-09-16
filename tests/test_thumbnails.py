"""Receipt thumbnail generation: sizing, EXIF rotation, and the fallback to the original."""

from io import BytesIO

import pytest
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile

from app.models import Receipt
from app.services.thumbnails import CARD_ASPECT, THUMBNAIL_WIDTH, generate_thumbnail


def make_image_file(size, name="receipt.jpg", mode="RGB", exif=None, fmt="JPEG"):
    """An in-memory upload, with a diagonal so rotation is detectable."""
    img = Image.new(mode, size, (255, 255, 255))
    for i in range(min(size)):
        img.putpixel((i, i), (0, 0, 0) if mode == "RGB" else 0)

    buffer = BytesIO()
    img.save(buffer, format=fmt, **({"exif": exif} if exif else {}))
    return SimpleUploadedFile(name, buffer.getvalue(), content_type=f"image/{fmt.lower()}")


@pytest.fixture(autouse=True)
def media_root(settings, tmp_path):
    """Keep generated files out of the real media dir."""
    settings.MEDIA_ROOT = tmp_path
    return tmp_path


class TestGenerateThumbnail:
    def test_crops_wide_image_to_card_aspect(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((2400, 1200))
        receipt.save()

        assert generate_thumbnail(receipt)

        with Image.open(receipt.thumbnail.path) as thumb:
            assert thumb.size == (THUMBNAIL_WIDTH, round(THUMBNAIL_WIDTH / CARD_ASPECT))

    def test_tall_receipt_keeps_full_width(self, test_user, db):
        """A long receipt must not end up narrower than the card it fills.

        Fitting into a square bounding box would scale by the 4080px height and
        leave a ~194px-wide image for a ~400px card.
        """
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((881, 4080))
        receipt.save()

        assert generate_thumbnail(receipt)

        with Image.open(receipt.thumbnail.path) as thumb:
            assert thumb.width == 881
            assert thumb.height == round(881 / CARD_ASPECT)

    def test_does_not_enlarge_small_source(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((300, 400))
        receipt.save()

        assert generate_thumbnail(receipt)

        with Image.open(receipt.thumbnail.path) as thumb:
            assert thumb.width == 300

    def test_applies_exif_rotation(self, test_user, db):
        """Orientation 6 means "rotate 90° CW to display", so the stored buffer is
        landscape while the receipt is portrait. The thumbnail has to match what a
        browser shows for the original, not the raw pixels."""
        exif = Image.Exif()
        exif[274] = 6  # Orientation
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((4000, 600), exif=exif.tobytes())
        receipt.save()

        assert generate_thumbnail(receipt)

        # Rotating makes the image 600 wide, which is under THUMBNAIL_WIDTH, so the
        # thumbnail stops there. Skip the rotation and the 4000px side is read as the
        # width instead and it comes out capped at 900.
        with Image.open(receipt.thumbnail.path) as thumb:
            assert thumb.width == 600

    def test_flattens_transparency(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((1200, 900), name="receipt.png", mode="RGBA", fmt="PNG")
        receipt.save()

        assert generate_thumbnail(receipt)

        with Image.open(receipt.thumbnail.path) as thumb:
            assert thumb.mode == "RGB"

    def test_always_writes_jpeg(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((1200, 900), name="receipt.png", mode="RGBA", fmt="PNG")
        receipt.save()
        generate_thumbnail(receipt)

        assert receipt.thumbnail.name.endswith(".jpg")

    def test_thumbnail_is_smaller_than_original(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((3000, 4000))
        receipt.save()
        generate_thumbnail(receipt)

        assert receipt.thumbnail.size < receipt.image.size

    def test_unreadable_image_is_not_fatal(self, test_user, db):
        """A receipt whose file is missing or corrupt still has to render."""
        receipt = Receipt(user=test_user)
        receipt.image = SimpleUploadedFile("broken.jpg", b"not an image", content_type="image/jpeg")
        receipt.save()

        assert generate_thumbnail(receipt) is False
        assert not receipt.thumbnail

    def test_no_image_returns_false(self, test_user, db):
        receipt = Receipt.objects.create(user=test_user)
        assert generate_thumbnail(receipt) is False


class TestDisplayImage:
    def test_prefers_thumbnail(self, test_user, db):
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((1200, 900))
        receipt.save()
        generate_thumbnail(receipt)

        assert receipt.display_image.name == receipt.thumbnail.name

    def test_falls_back_to_original(self, test_user, db):
        """Every receipt uploaded before thumbnailing existed takes this path."""
        receipt = Receipt(user=test_user)
        receipt.image = make_image_file((1200, 900))
        receipt.save()

        assert not receipt.thumbnail
        assert receipt.display_image.name == receipt.image.name
