import logging
from bson.objectid import ObjectId
from flask import abort, request, session
from flask.views import MethodView
from budgeter import app, mongo, make_json_response


class Bills(MethodView):

    def get(self, year, month):
        logging.debug('%s /bills', request.method)
        if 'user_id' not in session:
            abort(401)
        user_id = session['user_id']
        data = []
        try:
            params = {'user_id': user_id}
            if year:
                params['year'] = year
            if month:
                params['month'] = month
            cursor = mongo.db.bills.find(params)
            bill = cursor.next()
            while bill is not None:
                bill['_id'] = str(bill['_id'])
                data.append(bill)
                bill = cursor.next()
        except StopIteration as e:
            pass
        except Exception as ex:
            data = {'success': False}
            print ex

        return make_json_response(data)

    def post(self):
        logging.debug('%s /bills', request.method)
        if 'user_id' not in session:
            abort(401)
        user_id = session['user_id']
        bill = request.get_json()
        if '_id' in bill:
            return ('Should have PUT', 400)
        bill['user_id'] = user_id
        mongo.db.bills.save(bill, True)
        bill['_id'] = str(bill['_id'])
        return make_json_response(bill)

    def put(self, id):
        logging.debug('%s /bills/<id>/', request.method)
        if 'user_id' not in session:
            abort(401)
        user_id = session['user_id']
        bill = request.get_json()
        logging.debug('Looking for bill %s', id)
        if mongo.db.bills.find_one(ObjectId(id)) is None:
            logging.debug('Not found')
            return ('Bill not found', 400)
        logging.debug('Found')
        bill['user_id'] = user_id
        bill['_id'] = ObjectId(id)
        mongo.db.bills.save(bill, True)
        bill['_id'] = str(id)
        return make_json_response(bill)

    def delete(self, id):
        logging.debug('%s /bills/%s/', request.method, id)
        if 'user_id' not in session:
            abort(401)
        if mongo.db.bills.find_one(ObjectId(id)) is None:
            return ('Bill not found', 400)

        mongo.db.bills.remove(ObjectId(id))
        return ('', 204)

app.add_url_rule('/bills', view_func=Bills.as_view('post_bills'))
app.add_url_rule('/bills/<id>', view_func=Bills.as_view('put_bills'))
app.add_url_rule('/bills/<int:year>/<int:month>', view_func=Bills.as_view('get_bills'))
