import unittest
from budgeter import app
from test import login

class LoginTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_get_login(self):
        res = self.app.get('/login')
        self.assertTrue(res.status_code == 200)
        self.assertTrue(len(res.data) > 100)

    def test_post_login(self):
        res = login(self.app)
        self.assertTrue(res.status_code == 200)
        self.assertTrue('error-message' not in res.data)
        self.assertTrue('Budgeter Dashboard' in res.data)

    def test_post_login_invalid_credentials(self):
        username = 'baduser123'
        password = 'baduser123'
        res = login(self.app, username, password)
        self.assertTrue(res.status_code == 200)
        self.assertTrue('error-message' in res.data)

if __name__ == '__main__':
    unittest.main()
