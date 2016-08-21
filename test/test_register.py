import unittest
from budgeter import app, mongo

class RegisterTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
    
    @classmethod
    def tearDownClass(cls):
        with app.app_context():
            mongo.db.users.remove({ 'username': '__test_user__'})

    def test_get_register(self):
        res = self.app.get('/register')
        self.assertTrue(res.status_code == 200)
        self.assertTrue('Sign up' in res.data)

    def test_post_register(self):
        res = self.app.post(
            '/register',
            data={
                'username': '__test_user__',
                'email': '__test_user__@getbudgeter.com',
                'password': '__test_pass__',
                'confirm': '__test_pass__'
            },
            follow_redirects=True
        )

        self.assertTrue(res.status_code == 200)
        self.assertTrue('Budgeter Dashboard' in res.data)

if __name__ == '__main__':
    unittest.main()
