import logging
import hashlib
from datetime import datetime
from flask import redirect, render_template, request, session, url_for
from flask.views import MethodView
from budgeter.forms import RegistrationForm
from budgeter import app, mongo


class Register(MethodView):

    def get(self):
        logging.debug('GET /register')
        return render_template('register.html')

    def post(self):
        logging.debug('POST /register')
        form = RegistrationForm(request.form)
        error = None

        if not form.validate():
            logging.debug('Error validating registration form: %s', form.errors)
            matching_pw_err = 'Passwords must match'
            if 'password' in form.errors and matching_pw_err in form.errors['password']:
                error = matching_pw_err
            elif 'email' in form.errors:
                error = 'Invalid email.'
            else:
                error = 'Please fill in all fields.'
        elif mongo.db.users.find_one({'username': form.username.data}) is not None:
            error = 'Username taken.'
        elif mongo.db.users.find_one({'email': form.email.data}) is not None:
            error = 'Email address already in use.'
        else:
            user_id = mongo.db.users.save({
                'username': form.username.data,
                'email': form.email.data,
                'password': hashlib.md5(form.password.data).hexdigest(),
                'created': datetime.utcnow()
            })
            session['user_id'] = str(user_id)
            session.permanent = True
            logging.debug('Logged in user %s', form.username.data)
            return redirect(url_for('index'))

        logging.debug('Error logging in: %s', error)
        return render_template('register.html', username=form.username.data, email=form.email.data, error=error)


app.add_url_rule('/register', view_func=Register.as_view('register'))
