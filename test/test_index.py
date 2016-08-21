import unittest
from budgeter import app


class IndexTestCase(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_index(self):
        res = self.client.get('/')
        self.assertTrue(res.status_code == 200)
        self.assertTrue(len(res.data) > 100)

if __name__ == '__main__':
    unittest.main()
