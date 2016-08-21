import requests
from budgeter.config import SMTP_URL, SMTP_PASS
from flask import render_template


def send_password_retrieval_email(app, to_address, username, link):
    app.logger.debug('Rendering password-retrieval.email.html...')
    html = render_template(
        'password-retrieval.email.html',
        username=username, 
        link=link
    )
    app.logger.debug('Rendered.')

    return requests.post(
        SMTP_URL,
        auth=('api', SMTP_PASS),
        data={
            'from': 'Budgeter Password Reset <noreply@getbudgeter.com>',
            'to': [to_address],
            'bcc': ['info@getbudgeter.com'],
            'subject': 'getbudgeter.com password reset',
            'html': html
        }
    )
