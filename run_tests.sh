#!/bin/bash

# Simple test runner script for Budgeter e2e tests

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Running E2E Tests${NC}"
echo "================================"
echo ""

# Activate virtual environment and run tests
./env/bin/pytest tests/e2e/ "$@"

TEST_EXIT_CODE=$?

echo ""
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
else
    echo "Some tests failed. See output above for details."
fi

exit $TEST_EXIT_CODE
