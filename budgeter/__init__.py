import logging
import json
from os import environ
from os.path import join, dirname, abspath
from datetime import timedelta
from flask import Flask, Response
from flask.ext.pymongo import PyMongo
from budgeter.config import DEBUG, BUDGETER_SECRET, INDENT, LOG_FILE, SESSION_COOKIE_DOMAIN

logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG)

app = Flask('budgeter')
app.permanent_session_lifetime = timedelta(days=1000)
app.secret_key = BUDGETER_SECRET
if not DEBUG:
    app.config['SESSION_COOKIE_DOMAIN'] = SESSION_COOKIE_DOMAIN

# app.config['MONGO_HOST'] = environ.get('MONGO_HOST', 'localhost:27017')
mongo = PyMongo(app)

app.config['UPLOAD_FOLDER'] = join(dirname(abspath(__file__)), 'uploads')

def make_json_response(data):
    return Response(json.dumps(data, indent=INDENT), content_type='application/json')

from budgeter.views import *
