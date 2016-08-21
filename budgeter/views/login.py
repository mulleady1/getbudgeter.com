import hashlib
import logging
from flask import redirect, render_template, request, session, url_for
from flask.views import MethodView
from budgeter import app, mongo


class Login(MethodView):

    def get(self):
        logging.debug('GET /login')
        return render_template('login.html')

    def post(self):
        logging.debug('POST /login')
        logging.debug('looking for user %s', request.form['username'])
        user = mongo.db.users.find_one(
            {'username': request.form['username']}
        )
        if user is None:
            logging.debug('not found via username')
            user = mongo.db.users.find_one(
                {'email': request.form['username']}
            )
        if user is None or user['password'] != hashlib.md5(request.form['password']).hexdigest():
            if user is None:
                logging.debug('not found via email')
            else:
                logging.debug('invalid credentials')
            return render_template('login.html', error='Invalid credentials.')

        logging.debug('initializing session for %s', user['username'])
        session['user_id'] = str(user['_id'])
        session.permanent = True
        return redirect(url_for('index'))

app.add_url_rule('/login', view_func=Login.as_view('login'))
