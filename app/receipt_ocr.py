"""OCR service for processing receipt images"""

import logging
import re
from datetime import datetime
from decimal import Decimal
from typing import Optional

import pytesseract
from PIL import Image

logger = logging.getLogger(__name__)


class ReceiptOCRProcessor:
    """Process receipt images using OCR to extract structured data"""

    def process_receipt(self, image_path: str) -> dict:
        """
        Process a receipt image and extract structured data.

        Args:
            image_path: Path to the receipt image file

        Returns:
            Dictionary containing:
            - raw_text: The complete OCR text
            - merchant: Extracted merchant name (if found)
            - date: Extracted date (if found)
            - total: Extracted total amount
            - items: List of line items with descriptions and amounts
        """
        try:
            # Open and preprocess image
            image = Image.open(image_path)

            # Perform OCR
            raw_text = pytesseract.image_to_string(image)

            logger.info("OCR text extracted from receipt, length: %d chars", len(raw_text))

            # Extract structured data from OCR text
            merchant = self._extract_merchant(raw_text)
            date = self._extract_date(raw_text)
            items = self._extract_items(raw_text)
            total = self._extract_total(raw_text, items)

            return {
                "raw_text": raw_text,
                "merchant": merchant or "",
                "date": date or datetime.now().date(),
                "total": total,
                "items": items,
            }

        except Exception as e:
            logger.error("Error processing receipt OCR: %s", str(e), exc_info=True)
            raise

    def _extract_merchant(self, text: str) -> Optional[str]:
        """
        Extract merchant name from receipt text.
        Typically the merchant name is at the top of the receipt.
        """
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        if lines:
            # Return the first non-empty line as merchant name
            return lines[0][:255]  # Limit to 255 chars
        return None

    def _extract_date(self, text: str) -> Optional[datetime]:
        """Extract date from receipt text"""
        # Common date patterns
        date_patterns = [
            r"(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})",  # MM/DD/YYYY or DD/MM/YYYY
            r"(\d{4}[/-]\d{1,2}[/-]\d{1,2})",  # YYYY-MM-DD
            r"(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})",  # DD Month YYYY
        ]

        for pattern in date_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                date_str = match.group(1)
                # Try to parse the date
                for fmt in ["%m/%d/%Y", "%d/%m/%Y", "%Y-%m-%d", "%m-%d-%Y", "%d-%m-%Y", "%d %b %Y", "%d %B %Y"]:
                    try:
                        return datetime.strptime(date_str, fmt).date()
                    except ValueError:
                        continue

        return None

    def _extract_items(self, text: str) -> list:
        """
        Extract line items from receipt text.
        Looks for patterns like "Item Name 1.99" or "Item Name $1.99"
        """
        items = []
        lines = text.split("\n")

        # Pattern to match line items with amounts
        # Matches things like: "Coffee 2.50" or "Latte $3.99"
        item_pattern = r"^(.+?)\s+\$?(\d+\.\d{2})$"

        for line in lines:
            line = line.strip()
            match = re.match(item_pattern, line)
            if match:
                description = match.group(1).strip()
                amount_str = match.group(2)

                # Skip if description is too generic or looks like metadata
                if len(description) > 3 and not self._is_metadata_line(description):
                    try:
                        amount = Decimal(amount_str)
                        # Only include reasonable amounts (between 0.01 and 9999.99)
                        if Decimal("0.01") <= amount <= Decimal("9999.99"):
                            items.append({"description": description[:500], "amount": amount})
                    except (ValueError, ArithmeticError):
                        continue

        return items

    def _is_metadata_line(self, text: str) -> bool:
        """Check if a line is metadata rather than an item"""
        metadata_keywords = [
            "total",
            "subtotal",
            "tax",
            "change",
            "cash",
            "credit",
            "debit",
            "visa",
            "mastercard",
            "amex",
            "balance",
            "tender",
        ]
        text_lower = text.lower()
        return any(keyword in text_lower for keyword in metadata_keywords)

    def _extract_total(self, text: str, items: list) -> Decimal:
        """
        Extract total amount from receipt text.
        If not found, sum up all items.
        """
        # Look for "Total" or "Amount" followed by a price
        total_patterns = [
            r"total\s*:?\s*\$?(\d+\.\d{2})",
            r"amount\s*:?\s*\$?(\d+\.\d{2})",
            r"balance\s*:?\s*\$?(\d+\.\d{2})",
        ]

        for pattern in total_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                try:
                    total = Decimal(match.group(1))
                    if total > Decimal("0"):
                        return total
                except (ValueError, ArithmeticError):
                    continue

        # Fall back to summing items
        if items:
            return sum(item["amount"] for item in items)

        # Last resort: find the largest dollar amount in the text
        all_amounts = re.findall(r"\$?(\d+\.\d{2})", text)
        if all_amounts:
            try:
                amounts = [Decimal(amt) for amt in all_amounts]
                return max(amounts)
            except (ValueError, ArithmeticError):
                pass

        return Decimal("0.00")
