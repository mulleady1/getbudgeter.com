import json
import unittest
from budgeter import app
from test import login

class CalculatorTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        login(self.app)

    def test_01_post_calc(self):
        res = self.app.post(
            '/calc-cache/2016/8',
            data=json.dumps({
                'income': 5000,
                'expenses': 2000
            }),
            content_type='application/json'
        )

        self.assertTrue(res.status_code == 200)
        data = json.loads(res.data)
        self.assertTrue('msg' in data)
        self.assertTrue(data['msg'] == 'Saved.')

    def test_02_get_calc(self):
        res = self.app.get('/calc-cache/2016/8')
        self.assertTrue(res.status_code == 200)
        data = json.loads(res.data)
        self.assertTrue('income' in data)
        self.assertTrue('expenses' in data)

if __name__ == '__main__':
    unittest.main()
