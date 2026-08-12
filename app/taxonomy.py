"""Flat product taxonomy for receipt line items.

Deliberately coarse. These are the buckets receipt analytics rolls up to, not a
product ontology: "Cereal & Breakfast", not "Breakfast > Cold Cereal > Oat".

Adding a category is safe. Renaming or removing one strands the existing rows
that reference it — change the string here, then re-run
`normalize_receipt_items --all --clear-aliases` to remap the corpus.
"""

PRODUCT_CATEGORIES = [
    "Produce",
    "Meat & Seafood",
    "Dairy & Eggs",
    "Bakery",
    "Cereal & Breakfast",
    "Pantry & Dry Goods",
    "Snacks & Candy",
    "Frozen Foods",
    "Beverages",
    "Alcohol",
    "Prepared & Deli",
    "Baby & Kids",
    "Health & Pharmacy",
    "Personal Care",
    "Household & Cleaning",
    "Paper Goods",
    "Pet",
    "Home & Kitchen",
    "Clothing",
    "Electronics",
    "Office & School",
    "Auto & Fuel",
    "Garden & Outdoor",
    "Tools & Hardware",
    "Entertainment",
    "Services & Fees",
    "Other",
]

# Fallback when the model returns a category outside the list above.
UNCATEGORIZED = "Other"

# For pickers. The list above stays in shopping order because that's what the
# model reads in the prompt; a human scanning a dropdown wants alphabetical.
PRODUCT_CATEGORIES_AZ = sorted(PRODUCT_CATEGORIES)

PRODUCT_CATEGORY_CHOICES = [(name, name) for name in PRODUCT_CATEGORIES_AZ]
