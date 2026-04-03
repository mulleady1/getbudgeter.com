from datetime import datetime
from decimal import Decimal
from typing import Dict, List

from .base import BaseCSVParser


class BofAParser(BaseCSVParser):
    """Parser for Bank of America credit card CSV exports"""

    BANK_NAME = "bofa"

    def parse(self, csv_file) -> List[Dict]:
        """
        Parse BofA CSV file

        Expected columns: Posted Date, Reference Number, Payee, Address, Amount
        """
        rows = self._read_csv(csv_file)
        transactions = []

        for row in rows:
            if not row.get("Posted Date"):
                continue

            try:
                date_str = row.get("Posted Date", "").strip()
                date = datetime.strptime(date_str, "%m/%d/%Y").date()

                amount_str = row.get("Amount", "").strip().replace(",", "")
                if not amount_str:
                    continue
                amount = -Decimal(amount_str)

                description = row.get("Payee", "").strip()
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
                continue

        return transactions

    @staticmethod
    def detect(header_row: List[str]) -> bool:
        """
        Detect BofA CSV format by checking for expected columns

        BofA typically has: Posted Date, Reference Number, Payee, Address, Amount
        """
        required_columns = {"Posted Date", "Reference Number", "Payee", "Amount"}
        header_set = {col.strip() for col in header_row}

        return required_columns.issubset(header_set)
