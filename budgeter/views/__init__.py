import logging
from bson.objectid import ObjectId
from dateutil import parser
from flask import abort, render_template, request, session
from budgeter import app, mongo, make_json_response

__all__ = [
    'bills',
    'calculator',
    'forgot_password',
    'login',
    'logout',
    'password_reset',
    'register'
]

@app.route('/')
def index():
    logging.debug('%s /', request.method)
    if 'user_id' in session:
        user = mongo.db.users.find_one(ObjectId(session['user_id']))
        if user is not None:
            return render_template('dashboard.html', username=user['username'])
    return render_template('index.html')

@app.route('/password-email-sent', methods=['GET'])
def password_email_sent():
    return render_template('password-retrieval-sent.html')

@app.route('/copy', methods=['POST'])
def copy():
    logging.debug('%s /copy', request.method)
    if 'user_id' not in session:
        abort(401)
    user_id = session['user_id']
    idata = request.get_json()

    src = idata['src']
    src_start = parser.parse(src['start'])
    src_end = parser.parse(src['end'])
    dst = idata['dst']

    dst_start = parser.parse(dst['start'])
    dst_end = parser.parse(dst['end'])

    # Delete any existing bills for the target
    params = {
        'user_id': user_id,
        'due': {
            '$gte': dst_start,
            '$lt': dst_end
        }
    }

    logging.debug('Deleting bills with params: %s', params)
    result = mongo.db.bills.remove(params)
    logging.debug('Delete result: %s', result)

    # Get the source bills
    params = {
        'user_id': user_id,
        'due': {
            '$gte': src_start,
            '$lt': src_end
        }
    }

    # Iterate over the source bills. Delete ids, set attrs,
    # do inserts.
    logging.debug('Finding bills with params: %s', params)
    bills = list(mongo.db.bills.find(params))
    logging.debug('Found %d bills', len(bills))

    if len(bills) > 0:
        for bill in bills:
            del bill['_id']
            bill['paid'] = False
            bill['due'] = dst_start

        logging.debug('Inserting target bills: %s', bills)
        mongo.db.bills.insert(bills)

        # Convert ids to strings.
        for bill in bills:
            bill['_id'] = str(bill['_id'])
            bill['due'] = str(bill['due'])

    return make_json_response(bills)
