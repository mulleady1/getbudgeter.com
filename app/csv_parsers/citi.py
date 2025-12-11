from datetime import datetime
from decimal import Decimal
from typing import Dict, List

from .base import BaseCSVParser


class CitiParser(BaseCSVParser):
    """Parser for Citi credit card CSV exports"""

    BANK_NAME = "citi"

    def parse(self, csv_file) -> List[Dict]:
        """
        Parse Citi CSV file

        Expected columns: Status, Date, Description, Debit, Credit
        """
        rows = self._read_csv(csv_file)
        transactions = []

        for row in rows:
            # Skip empty rows
            if not row.get("Date"):
                continue

            try:
                # Parse date - Citi usually uses MM/DD/YYYY format
                date_str = row.get("Date", "").strip()
                date = datetime.strptime(date_str, "%m/%d/%Y").date()

                # Parse amount
                debit = row.get("Debit", "").strip().replace("$", "").replace(",", "")
                credit = row.get("Credit", "").strip().replace("$", "").replace(",", "")

                if debit:
                    amount = Decimal(debit)
                elif credit:
                    amount = Decimal(credit)
                else:
                    continue  # Skip if no amount

                # Get description
                description = row.get("Description", "").strip()
                if not description:
                    continue

                merchant = self.extract_merchant(description)

                transactions.append(
                    {
                        "date": date,
                        "description": description,
                        "merchant": merchant,
                        "amount": amount,
                        "original_data": dict(row),
                    }
                )

            except (ValueError, KeyError):
                # Skip rows with parsing errors
                continue

        return transactions

    @staticmethod
    def detect(header_row: List[str]) -> bool:
        """
        Detect Citi CSV format by checking for expected columns

        Citi typically has: Status, Date, Description, Debit, Credit
        """
        required_columns = {"Date", "Description", "Debit", "Credit"}
        header_set = {col.strip() for col in header_row}

        return required_columns.issubset(header_set)
