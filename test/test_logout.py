import unittest
from budgeter import app
from test import login

class LogoutTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        login(self.app)

    def test_logout(self):
        res = self.app.post('/logout', follow_redirects=True)
        self.assertTrue(res.status_code == 200)
        self.assertTrue('simple financial tracking' in res.data)        

if __name__ == '__main__':
    unittest.main()
