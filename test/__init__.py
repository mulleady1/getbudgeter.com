import os
from budgeter import app

app.config['TESTING'] = True

def login(test_client, username=None, password=None):
    if username is None:
        username = os.getenv('BUDGETER_TEST_USERNAME')
    if password is None:
        password = os.getenv('BUDGETER_TEST_PASSWORD')
    if username is None or password is None:
        raise Exception('Missing test env vars')

    return test_client.post('/login', data={
        'username': username,
        'password': password
    }, follow_redirects=True)
