import logging
from bson.objectid import ObjectId
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
    data = []
    try:
        idata = request.get_json()
        if not ('month' in idata and 'year' in idata):
            return ('month and year required', 400)
        month = idata['month']
        year = idata['year']
        # Delete any existing bills for the selected month
        params = {
            'user_id': user_id,
            'month': month,
            'year': year
        }
        mongo.db.bills.remove(params)

        # Get the previous month's bills
        params = {
            'user_id': user_id,
            'month': month - 1 if month > 1 else 12,
            'year': year if month > 1 else year - 1
        }

        cursor = mongo.db.bills.find(params)
        bill = cursor.next()
        # Iterate over the previous month's bills. Delete ids, set attrs, do
        # inserts.
        try:
            while bill is not None:
                del bill['_id']
                if 'paid' in bill:
                    del bill['paid']
                bill['month'] = month
                bill['year'] = year
                mongo.db.bills.save(bill)
                data.append(bill)
                bill = cursor.next()
        except StopIteration:
            pass

        # Convert ids to strings.
        for bill in data:
            bill['_id'] = str(bill['_id'])

    except Exception as ex:
        data = {'msg': ex.message}

    return make_json_response(data)
