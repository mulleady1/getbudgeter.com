import datetime
import hashlib
import logging
import pytz
from bson.objectid import ObjectId
from flask import abort, render_template, request, redirect, session, url_for
from flask.views import MethodView
from budgeter import app, mongo
from budgeter.forms import RegistrationForm


class PasswordReset(MethodView):

    def get(self, id):
        logging.debug('GET /password-reset')
        try:
            retrieval = mongo.db.password_retrievals.find_one(ObjectId(id))
            logging.debug('Retrieval: %s', retrieval)
            yesterday = datetime.datetime.utcnow() - datetime.timedelta(days=1)
            if retrieval['created'].replace(tzinfo=pytz.UTC) < yesterday.replace(tzinfo=pytz.UTC):
                logging.debug('Link expired. Created at %s',
                              retrieval['created'])
                return render_template('link-expired.html')
            user = mongo.db.users.find_one(retrieval['user_id'])
            logging.debug('user: %s', user['username'])
            session['user_id'] = str(user['_id'])
            session.permanent = True
            return render_template('reset-password.html', username=user['username'], email=user['email'])
        except Exception as ex:
            logging.debug(ex)
            return ('An error occurred', 500)

    def post(self):
        logging.debug('POST /password-reset')
        if 'user_id' not in session:
            abort(401)
        user = mongo.db.users.find_one(ObjectId(session['user_id']))
        form = RegistrationForm(request.form)
        if not form.validate():
            logging.debug('Invalid reset password form: %s', form.errors)
            return render_template('reset-password.html', username=user['username'], email=user['email'], error='Please fill in all fields.')
        user['password'] = hashlib.md5(form.password.data).hexdigest()
        mongo.db.users.save(user)
        logging.debug('Reset password success for %s', user['username'])
        return redirect(url_for('index'))

app.add_url_rule(
    '/password-reset',
    view_func=PasswordReset.as_view('post_forgot_password')
)

app.add_url_rule(
    '/password-reset/<id>',
    view_func=PasswordReset.as_view('get_forgot_password')
)
