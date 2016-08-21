import logging
import json
from os.path import join
from flask import Flask, Response
from flask.ext.pymongo import PyMongo
from datetime import timedelta
from budgeter.config import BUDGETER_SECRET, INDENT, LOG_FILE

logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG)

app = Flask('budgeter')
app.permanent_session_lifetime = timedelta(days=1000)
app.secret_key = BUDGETER_SECRET

mongo = PyMongo(app)

def make_json_response(data):
    return Response(json.dumps(data, indent=INDENT), content_type='application/json')

from budgeter.views import *
