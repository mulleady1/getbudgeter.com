import logging
from flask import redirect, session
from flask.views import MethodView
from budgeter import app


class Logout(MethodView):

    def post(self):
        logging.debug('POST /logout')
        session.pop('user_id', None)
        return redirect('/')


app.add_url_rule('/logout', view_func=Logout.as_view('logout'))
