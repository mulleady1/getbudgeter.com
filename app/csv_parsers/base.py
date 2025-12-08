import csv
import datetime
import hashlib
from abc import ABC, abstractmethod
from decimal import Decimal
from io import TextIOWrapper
from typing import Dict, List


class BaseCSVParser(ABC):
    """Abstract base class for CSV parsers"""

    @abstractmethod
    def parse(self, csv_file) -> List[Dict]:
        """
        Parse CSV file and return list of normalized transaction dicts

        Args:
            csv_file: File object (from request.FILES)

        Returns:
            List of transaction dicts with keys:
                - date: datetime.date
                - description: str
                - merchant: str (extracted from description)
                - amount: Decimal (negative for debits, positive for credits)
                - original_data: dict (original row data)
        """
        pass

    @staticmethod
    @abstractmethod
    def detect(header_row: List[str]) -> bool:
        """
        Detect if this parser can handle the CSV based on header row

        Args:
            header_row: First row of CSV (column names)

        Returns:
            True if this parser can handle this CSV format
        """
        pass

    @staticmethod
    def extract_merchant(description: str) -> str:
        """
        Extract merchant name from transaction description

        This is a simple implementation that takes the first part of the description.
        Can be overridden by subclasses for bank-specific logic.
        """
        # Remove extra whitespace
        description = " ".join(description.split())

        # Common patterns to try to extract merchant name
        # For now, just return the first 50 chars as merchant
        return description[:50].strip()

    @staticmethod
    def generate_transaction_hash(user_id: int, date: datetime.date, description: str, amount: Decimal) -> str:
        """
        Generate unique hash for deduplication

        Args:
            user_id: User ID
            date: Transaction date
            description: Transaction description
            amount: Transaction amount

        Returns:
            SHA256 hash string
        """
        hash_string = f"{user_id}|{date.isoformat()}|{description}|{amount}"
        return hashlib.sha256(hash_string.encode()).hexdigest()

    def _read_csv(self, csv_file) -> List[Dict]:
        """
        Helper method to read CSV file into list of dicts

        Args:
            csv_file: File object

        Returns:
            List of row dicts
        """
        # Reset file pointer
        csv_file.seek(0)

        # Detect encoding and wrap in TextIOWrapper if needed
        if isinstance(csv_file, TextIOWrapper):
            text_file = csv_file
        else:
            text_file = TextIOWrapper(csv_file, encoding="utf-8-sig")

        reader = csv.DictReader(text_file)
        rows = list(reader)

        return rows
