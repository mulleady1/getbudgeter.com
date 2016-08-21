import os
import unittest
from budgeter import app
from test import login

class ForgotPasswordTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        login(self.app)

    def test_get_forgot_password(self):
        res = self.app.get('/forgot-password')
        self.assertTrue(res.status_code == 200)
        self.assertTrue('Password Retrieval' in res.data)

    def test_post_forgot_password(self):
        if bool(os.getenv('SKIP_EMAIL_TEST')):
            return

        res = self.app.post(
            '/forgot-password',
            data={
                'email': os.getenv('BUDGETER_TEST_EMAIL')
            },
            follow_redirects=True
        )

        self.assertTrue(res.status_code == 200)
        self.assertTrue('You should receive an email shortly' in res.data)

if __name__ == '__main__':
    unittest.main()
