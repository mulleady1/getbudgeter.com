# End-to-End Testing with Playwright

This directory contains end-to-end tests for the Budgeter application using Playwright and pytest.

## Setup

### Installing Test Dependencies

Test dependencies are kept separate from production dependencies:

**Development/Testing environment**:
```bash
./env/bin/pip install -r requirements-dev.txt
```

**Production environment**:
```bash
./env/bin/pip install -r requirements.txt  # No test dependencies
```

After installing test dependencies, install Playwright browsers:
```bash
./env/bin/playwright install chromium
```

## Quick Start

### Running Tests

Run all e2e tests:
```bash
./env/bin/pytest tests/e2e/
```

Run a specific test file:
```bash
./env/bin/pytest tests/e2e/test_bills.py
```

Run a specific test:
```bash
./env/bin/pytest tests/e2e/test_bills.py::TestBillManagement::test_user_can_login
```

### Useful Options

**Headless mode** (the default — no flag needed, and faster):
```bash
./env/bin/pytest tests/e2e/
```

**Headed mode** (see the browser):
```bash
./env/bin/pytest tests/e2e/ --headed
```

**Slow motion** (helpful for debugging):
```bash
./env/bin/pytest tests/e2e/ --headed --slowmo 1000
```

**Different browsers**:
```bash
./env/bin/pytest tests/e2e/ --browser firefox
./env/bin/pytest tests/e2e/ --browser webkit  # Safari engine
```

**Verbose output**:
```bash
./env/bin/pytest tests/e2e/ -v
```

**Stop on first failure**:
```bash
./env/bin/pytest tests/e2e/ -x
```

## Test Structure

```
tests/
├── conftest.py              # Shared fixtures for all tests
├── e2e/
│   ├── test_bills.py        # Bill management tests
│   └── test_htmx_interactions.py  # HTMX-specific tests
└── README.md                # This file
```

## Available Fixtures

### `test_user`
Creates a test user with credentials:
- Username: `testuser`
- Email: `test@example.com`
- Password: `testpass123`

```python
def test_something(test_user):
    assert test_user.username == "testuser"
```

### `authenticated_page`
Provides a Playwright Page object that's already logged in.

```python
def test_authenticated_route(authenticated_page, base_url):
    authenticated_page.goto(f"{base_url}/bills")
    # Already logged in!
```

### `base_url`
The URL of the test server.

```python
def test_home(page, base_url):
    page.goto(base_url)
```

### `page`
Standard Playwright Page object (not authenticated).

```python
def test_login_page(page, base_url):
    page.goto(f"{base_url}/login")
```

## Writing Tests for HTMX

Your app uses HTMX, which means many interactions don't reload the page. Here are some tips:

### Wait for HTMX Requests

Always wait for network activity to complete after HTMX interactions:

```python
page.click('button[hx-get]')
page.wait_for_load_state("networkidle")
```

### Test Partial Updates

Verify that only part of the page updates:

```python
initial_title = page.title()
page.click('[hx-target="#content"]')
page.wait_for_load_state("networkidle")
assert page.title() == initial_title  # Page didn't fully reload
```

### Check for Loading States

If you use `hx-indicator`, test that loading states appear:

```python
page.click('button[hx-post]')
expect(page.locator('#loading-spinner')).to_be_visible()
page.wait_for_load_state("networkidle")
expect(page.locator('#loading-spinner')).to_be_hidden()
```

### Handle Confirmations

If using `hx-confirm`:

```python
page.on("dialog", lambda dialog: dialog.accept())
page.click('button[hx-delete][hx-confirm]')
```

## Debugging Tests

### Visual Debugging

Run with `--headed` to see what's happening:
```bash
./env/bin/pytest tests/e2e/ --headed --slowmo 500
```

### Screenshots

Take a screenshot when a test fails:
```python
def test_something(page, base_url):
    try:
        page.goto(f"{base_url}/bills")
        # ... test code
    except Exception:
        page.screenshot(path="error.png")
        raise
```

### Pause Execution

Add a breakpoint to inspect:
```python
def test_something(page):
    page.goto("/")
    page.pause()  # Opens Playwright Inspector
```

### Print Console Logs

See browser console output:
```python
def test_something(page):
    page.on("console", lambda msg: print(f"CONSOLE: {msg.text}"))
    page.goto("/")
```

## Best Practices

1. **Use semantic selectors**: Prefer `text=Login` over complex CSS selectors
2. **Wait appropriately**: Always use `wait_for_load_state("networkidle")` after HTMX actions
3. **Use fixtures**: Create reusable fixtures for common test data
4. **Test user flows**: Focus on realistic user journeys, not just individual features
5. **Keep tests independent**: Each test should work on its own
6. **Use data attributes**: Add `data-testid` attributes to important elements for stable selectors

## Example: Complete Test

```python
import pytest
from playwright.sync_api import Page, expect


@pytest.mark.django_db
def test_complete_bill_workflow(authenticated_page: Page, base_url):
    """Test creating, editing, and deleting a bill."""
    # Create a bill
    authenticated_page.goto(f"{base_url}/bills/new")
    authenticated_page.fill('input[name="name"]', "Test Bill")
    authenticated_page.fill('input[name="amount"]', "100.00")
    authenticated_page.click('button[type="submit"]')
    authenticated_page.wait_for_load_state("networkidle")

    # Verify it appears
    expect(authenticated_page.locator('text=Test Bill')).to_be_visible()

    # Edit the bill
    authenticated_page.click('button:has-text("Edit")')
    authenticated_page.wait_for_load_state("networkidle")
    authenticated_page.fill('input[name="amount"]', "150.00")
    authenticated_page.click('button[type="submit"]')
    authenticated_page.wait_for_load_state("networkidle")

    # Delete the bill
    authenticated_page.on("dialog", lambda dialog: dialog.accept())
    authenticated_page.click('button:has-text("Delete")')
    authenticated_page.wait_for_load_state("networkidle")

    # Verify it's gone
    expect(authenticated_page.locator('text=Test Bill')).to_be_hidden()
```

## Troubleshooting

### "Target page, context or browser has been closed"
Make sure you're using `@pytest.mark.django_db` on tests that access the database.

### Tests are flaky
Add more explicit waits:
```python
page.wait_for_selector('text=Expected Text')
page.wait_for_load_state("networkidle")
```

### Can't find element
Use the Playwright inspector to check selectors:
```bash
./env/bin/pytest tests/e2e/test_bills.py --headed
# Add page.pause() in your test
```

### Tests fail in CI but pass locally
Drop `--headed` so the local run is headless and matches the CI environment.

## Resources

- [Playwright Python Docs](https://playwright.dev/python/)
- [pytest-django Docs](https://pytest-django.readthedocs.io/)
- [HTMX Documentation](https://htmx.org/docs/)
