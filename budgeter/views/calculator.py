import logging
from bson.objectid import ObjectId
from flask import abort, request, session
from flask.views import MethodView
from budgeter import app, mongo, make_json_response


class Calculator(MethodView):

    def get(self, year, month):
        logging.debug('GET /calc-cache')
        if 'user_id' not in session:
            abort(401)

        user = mongo.db.users.find_one(ObjectId(session['user_id']))
        key = '%s%s' % (year, month)
        if not 'calc_cache' in user:
            user['calc_cache'] = {}

        data = {}
        if key in user['calc_cache']:
            data = user['calc_cache'][key]
        elif 'defaults' in user['calc_cache']:
            data = user['calc_cache']['defaults']
        return make_json_response(data)

    def post(self, year, month):
        logging.debug('POST /calc-cache')
        if 'user_id' not in session:
            abort(401)

        user = mongo.db.users.find_one(ObjectId(session['user_id']))
        key = '%s%s' % (year, month)
        if not 'calc_cache' in user:
            user['calc_cache'] = {}

        idata = request.get_json()
        user['calc_cache'][key] = {}
        if not 'defaults' in user['calc_cache']:
            user['calc_cache']['defaults'] = {}

        if 'income' in idata:
            income = idata['income']
            user['calc_cache'][key]['income'] = income
            user['calc_cache']['defaults']['income'] = income
        if 'expenses' in idata:
            expenses = idata['expenses']
            user['calc_cache'][key]['expenses'] = expenses
            user['calc_cache']['defaults']['expenses'] = expenses

        mongo.db.users.save(user)
        return make_json_response({'msg': 'Saved.'})


app.add_url_rule('/calc-cache/<int:year>/<int:month>', view_func=Calculator.as_view('calculator'))
