# CSV Transaction Upload & Budget Visualization - Implementation Plan

## Overview
Add a feature for users to upload credit card CSV files (Citi, Capital One), auto-categorize transactions, and visualize spending with interactive charts.

## Tech Stack Additions
- **Plotly Python** (`plotly`) - Server-side chart generation
- **Pandas** (`pandas`) - CSV processing and data manipulation (optional, could use stdlib `csv`)

## Database Schema

### 1. Transaction Model
```python
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(db_index=True)
    description = models.CharField(max_length=500)
    merchant = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey('Category', null=True, blank=True, on_delete=models.SET_NULL)

    # For deduplication
    transaction_hash = models.CharField(max_length=64, db_index=True)

    # Metadata
    original_data = models.JSONField()  # Store original CSV row
    source = models.CharField(max_length=50)  # e.g., "citi", "capital_one"
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']
        indexes = [
            models.Index(fields=['user', 'date']),
            models.Index(fields=['user', 'transaction_hash']),
        ]
```

### 2. Category Model
```python
class Category(models.Model):
    CATEGORY_CHOICES = [
        ('dining', 'Dining & Food'),
        ('groceries', 'Groceries'),
        ('shopping', 'Shopping'),
        ('transportation', 'Transportation'),
        ('entertainment', 'Entertainment'),
        ('utilities', 'Utilities'),
        ('healthcare', 'Healthcare'),
        ('travel', 'Travel'),
        ('income', 'Income'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_default = models.BooleanField(default=False)

    class Meta:
        unique_together = [['name', 'user']]
```

### 3. CategoryRule Model (for auto-categorization)
```python
class CategoryRule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    keyword = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)  # System defaults vs user rules
    priority = models.IntegerField(default=0)  # Higher priority rules match first

    class Meta:
        ordering = ['-priority', 'keyword']
```

### 4. Budget Model
```python
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.DateField()  # First day of month
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['user', 'category', 'month']]
        ordering = ['category__name']
```

## CSV Parsing & Normalization

### CSV Parser Structure
```
app/
  csv_parsers/
    __init__.py
    base.py          # BaseCSVParser abstract class
    citi.py          # CitiParser
    capital_one.py   # CapitalOneParser
    detector.py      # Auto-detect bank from CSV structure
```

### BaseCSVParser
- Abstract class defining interface
- Methods: `parse()`, `normalize()`, `detect()`
- Returns standardized transaction dicts

### Bank-Specific Parsers
**Citi CSV Format** (typical):
- Columns: Status, Date, Description, Debit, Credit

**Capital One CSV Format** (typical):
- Columns: Transaction Date, Posted Date, Card No., Description, Category, Debit, Credit

**Normalization Output**:
```python
{
    'date': date_obj,
    'description': str,
    'merchant': str,  # extracted from description
    'amount': Decimal,  # negative for debits, positive for credits
}
```

### Deduplication Strategy
1. Generate hash from: `user_id + date + description + amount`
2. Use SHA256 hash stored in `transaction_hash` field
3. Before creating transaction, check if hash exists for user
4. Skip duplicates, return count of skipped records

## Auto-Categorization

### Rule-Based Engine
```python
class TransactionCategorizer:
    def categorize(self, transaction, user):
        # 1. Check user-specific rules first (highest priority)
        # 2. Fall back to default rules
        # 3. Return None if no match (user can manually categorize)

        # Matching: case-insensitive substring match on merchant/description
```

### Default Category Rules (examples)
```python
DEFAULT_RULES = {
    'dining': ['restaurant', 'cafe', 'starbucks', 'chipotle', 'doordash', 'uber eats'],
    'groceries': ['whole foods', 'trader joe', 'safeway', 'kroger', 'walmart grocery'],
    'shopping': ['amazon', 'target', 'walmart', 'best buy'],
    'transportation': ['uber', 'lyft', 'shell', 'chevron', 'parking'],
    'utilities': ['pg&e', 'comcast', 'at&t', 'verizon', 'internet'],
    ...
}
```

### User Rule Creation
- When user manually categorizes a transaction, offer to create rule
- Store as CategoryRule with merchant/description keyword

## Visualizations (using Plotly)

### 1. Spending by Category (Pie Chart)
```python
import plotly.express as px

def generate_category_chart(transactions):
    # Group by category, sum amounts
    # Create pie chart with Plotly
    fig = px.pie(df, values='amount', names='category',
                 title='Spending by Category')
    return fig.to_html(include_plotlyjs='cdn', div_id='category-chart')
```

### 2. Spending Over Time (Line Chart)
```python
def generate_trend_chart(transactions):
    # Group by month, sum amounts
    fig = px.line(df, x='month', y='amount',
                  title='Spending Trend')
    return fig.to_html(include_plotlyjs='cdn', div_id='trend-chart')
```

### 3. Budget vs Actual (Bar Chart)
```python
def generate_budget_chart(budgets, transactions):
    # Compare budget amounts to actual spending by category
    fig = px.bar(df, x='category', y=['budget', 'actual'],
                 barmode='group', title='Budget vs Actual')
    return fig.to_html(include_plotlyjs='cdn', div_id='budget-chart')
```

### 4. Top Merchants (Bar Chart)
```python
def generate_merchant_chart(transactions):
    # Group by merchant, sum amounts, take top 10
    fig = px.bar(df, x='merchant', y='amount',
                 title='Top Merchants')
    return fig.to_html(include_plotlyjs='cdn', div_id='merchant-chart')
```

## URL Structure

```python
urlpatterns = [
    # ... existing URLs ...

    # Transactions
    path('transactions', views.TransactionListView.as_view(), name='transactions'),
    path('transactions/upload', views.UploadCSVView.as_view(), name='upload_csv'),
    path('transactions/<int:transaction_id>/categorize',
         views.categorize_transaction, name='categorize_transaction'),
    path('transactions/<int:transaction_id>',
         views.TransactionEditDeleteView.as_view(), name='edit_delete_transaction'),

    # Analytics
    path('analytics', views.AnalyticsView.as_view(), name='analytics'),
    path('analytics/chart/<str:chart_type>', views.get_chart, name='get_chart'),

    # Budgets
    path('budgets', views.BudgetListView.as_view(), name='budgets'),
    path('budgets/new', views.new_budget, name='new_budget'),
    path('budgets/<int:budget_id>',
         views.BudgetEditDeleteView.as_view(), name='edit_delete_budget'),
]
```

## Views Implementation

### UploadCSVView
```python
class UploadCSVView(LoginRequiredMixin, View):
    def get(self, request):
        # Show upload form
        return render(request, 'transactions/upload.html')

    def post(self, request):
        csv_file = request.FILES['csv_file']

        # 1. Detect bank from CSV structure
        # 2. Parse CSV with appropriate parser
        # 3. Categorize transactions
        # 4. Check for duplicates
        # 5. Bulk create transactions
        # 6. Return summary (created count, skipped count)

        return render(request, 'transactions/upload_summary.html', context)
```

### AnalyticsView
```python
class AnalyticsView(LoginRequiredMixin, View):
    def get(self, request):
        # Get date range from query params (default: last 3 months)
        # Fetch transactions for user in date range

        # Generate charts
        category_chart = generate_category_chart(transactions)
        trend_chart = generate_trend_chart(transactions)

        context = {
            'category_chart': category_chart,
            'trend_chart': trend_chart,
            # ... other charts
        }

        return render(request, 'analytics/analytics_page.html', context)
```

### TransactionListView
```python
class TransactionListView(LoginRequiredMixin, View):
    def get(self, request):
        # Paginated list of transactions
        # Filter by date range, category
        # Support HTMX for infinite scroll

        transactions = Transaction.objects.filter(user=request.user)

        if request.htmx:
            template = 'transactions/transaction_list.html'
        else:
            template = 'transactions/transactions_page.html'

        return render(request, template, {'transactions': transactions})
```

## Template Structure

```
app/templates/
  transactions/
    transactions_page.html      # Main page (extends base.html)
    transaction_list.html        # List partial (for HTMX)
    transaction_list_item.html   # Single item
    upload.html                  # Upload form modal
    upload_summary.html          # Upload results modal
    categorize_form.html         # Category selection form

  analytics/
    analytics_page.html          # Main analytics page
    chart_card.html              # Reusable chart container

  budgets/
    budgets_page.html
    budget_list.html
    budget_form.html
```

## HTMX Integration Patterns

Following existing patterns:
- Use `hx-get`, `hx-post`, `hx-put`, `hx-delete`
- `hx-target` for swapping partials
- `HX-Trigger` response headers for coordinating updates
- Modal dialogs with `hx-swap="beforeend"` targeting body

Example upload button:
```html
<wa-button hx-get="{% url 'upload_csv' %}"
           hx-target="body"
           hx-swap="beforeend">
  <wa-icon slot="start" name="upload"></wa-icon>
  Upload Transactions
</wa-button>
```

## Settings Updates

```python
# settings.py additions
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Optional: File upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
```

## Dependencies to Add

```
# requirements.txt additions
plotly==5.18.0
pandas==2.2.0  # Optional, can use stdlib csv instead
```

## Migration Strategy

1. Create models (Transaction, Category, CategoryRule, Budget)
2. Create default categories with `is_default=True`
3. Create default category rules with `is_default=True`
4. Users can add custom rules that override defaults

## Implementation Phases

### Phase 1: Core Models & CSV Upload
- Create models and migrations
- Implement CSV parsers (Citi, Capital One)
- Upload view and basic transaction list
- Deduplication logic

### Phase 2: Categorization
- Implement rule-based categorization
- Default rules seeded via migration
- Manual categorization UI
- Rule creation from categorized transactions

### Phase 3: Visualizations
- Install Plotly
- Implement chart generation functions
- Analytics page with spending by category
- Spending over time chart

### Phase 4: Budget Management
- Budget CRUD views
- Budget vs actual visualization
- Budget tracking on analytics page

### Phase 5: Additional Features
- Top merchants chart
- Month-over-month comparison
- Export functionality
- Advanced filtering

## Testing Considerations

- Test with sample Citi and Capital One CSVs
- Test deduplication with duplicate uploads
- Test categorization accuracy
- Test with large CSV files (1000+ transactions)
- Test date range filtering
- Test HTMX interactions

## Security Considerations

- Validate CSV file size (max 5MB)
- Validate CSV structure before processing
- Sanitize merchant/description fields
- User-scoped queries (always filter by request.user)
- CSRF protection on upload form
- File type validation (only .csv)

## Performance Considerations

- Use `bulk_create()` for transaction inserts
- Index on user_id + date for fast queries
- Index on transaction_hash for deduplication
- Paginate transaction list
- Cache category rules in memory
- Limit chart data to reasonable date ranges (e.g., 12 months)

## Future Enhancements (Out of Scope)

- Claude API integration for ambiguous categorizations
- Recurring transaction detection
- Budget recommendations based on spending patterns
- Multi-bank account support
- Split transactions
- Tags/notes on transactions
- Receipt image upload
- Export to Excel/PDF
