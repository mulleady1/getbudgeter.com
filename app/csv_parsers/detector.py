import csv
from io import TextIOWrapper
from typing import Optional, Type

from .base import BaseCSVParser
from .capital_one import CapitalOneParser
from .citi import CitiParser

# List of all available parsers
PARSERS = [CitiParser, CapitalOneParser]


def detect_bank_from_csv(csv_file) -> Optional[Type[BaseCSVParser]]:
    """
    Auto-detect which bank parser to use based on CSV structure

    Args:
        csv_file: File object from request.FILES

    Returns:
        Parser class if detected, None if no parser matches
    """
    # Reset file pointer
    csv_file.seek(0)

    try:
        # Read header row
        # If it's already a TextIOWrapper, use it directly
        if isinstance(csv_file, TextIOWrapper):
            text_file = csv_file
            reader = csv.reader(text_file)
            header_row = next(reader)
            csv_file.seek(0)
        else:
            # For binary files, read first line as bytes and decode
            # This avoids creating a TextIOWrapper that might close the file
            first_line_bytes = csv_file.readline()
            csv_file.seek(0)  # Reset immediately

            # Decode and parse the header
            first_line = first_line_bytes.decode("utf-8-sig").strip()
            header_row = next(csv.reader([first_line]))

        # Try each parser's detect method
        for parser_class in PARSERS:
            if parser_class.detect(header_row):
                return parser_class

        return None

    except Exception:
        # Reset file and return None if detection fails
        try:
            csv_file.seek(0)
        except (ValueError, AttributeError):
            pass  # File might already be closed
        return None
