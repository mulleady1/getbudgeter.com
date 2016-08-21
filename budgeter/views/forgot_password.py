import datetime
import logging
from flask import render_template, request, redirect, url_for
from flask.views import MethodView
from budgeter import app, mongo
from budgeter.util import send_password_retrieval_email


class ForgotPassword(MethodView):

    def get(self):
        logging.debug('GET /forgot-password')
        return render_template('forgot-password.html')

    def post(self):
        logging.debug('POST /forgot-password')
        email = request.form['email'].strip()
        if email == '':
            logging.debug('No email')
            return render_template('forgot-password.html', error='Email field required.')

        user = mongo.db.users.find_one({'email': email})
        if user is None:
            logging.debug('User not found for email %s', email)
            return render_template('forgot-password.html', error='User not found.')

        to_address = user['email']
        username = user['username']

        id = mongo.db.password_retrievals.save({
            'user_id': user['_id'],
            'created': datetime.datetime.utcnow()
        })

        logging.debug('sending email to user %s with email %s and link %s',
            username, to_address, id
        )

        res = send_password_retrieval_email(app, to_address, username, id)
        logging.debug('response: %s', res)

        if res is None:
            return render_template('forgot-password.html', error='Oops! An error occurred. Please try again.')

        return redirect(url_for('password_email_sent'))

app.add_url_rule('/forgot-password', view_func=ForgotPassword.as_view('forgot_password'))
