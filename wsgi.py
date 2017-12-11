#!/usr/bin/env python

from budgeter import app
from budgeter.config import DEBUG

if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0', port=8000)
