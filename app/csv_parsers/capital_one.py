from datetime import datetime
from decimal import Decimal
from typing import Dict, List

from .base import BaseCSVParser


class CapitalOneParser(BaseCSVParser):
    """Parser for Capital One credit card CSV exports"""

    BANK_NAME = "capital_one"

    def parse(self, csv_file) -> List[Dict]:
        """
        Parse Capital One CSV file

        Expected columns: Transaction Date, Posted Date, Card No., Description, Category, Debit, Credit
        """
        rows = self._read_csv(csv_file)
        transactions = []

        for row in rows:
            # Try both "Transaction Date" and "Posted Date"
            date_str = row.get("Transaction Date", row.get("Posted Date", "")).strip()

            if not date_str:
                continue

            try:
                # Parse date - Capital One uses YYYY-MM-DD format
                date = datetime.strptime(date_str, "%Y-%m-%d").date()

                # Parse amount
                debit = row.get("Debit", "").strip().replace("$", "").replace(",", "")
                credit = row.get("Credit", "").strip().replace("$", "").replace(",", "")

                if debit:
                    amount = -Decimal(debit)
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
        Detect Capital One CSV format by checking for expected columns

        Capital One typically has: Transaction Date or Posted Date, Description, Debit, Credit
        """
        required_columns = {"Description", "Debit", "Credit"}
        date_columns = {"Transaction Date", "Posted Date"}

        header_set = {col.strip() for col in header_row}

        # Must have required columns and at least one date column
        has_required = required_columns.issubset(header_set)
        has_date = any(date_col in header_set for date_col in date_columns)

        return has_required and has_date
