import json
import unittest
from budgeter import app
from test import login

class BillsTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        login(self.app)

    def test_get_bills(self):
        self.app.post(
            '/bills',
            data=json.dumps({
                'name': 'test',
                'amount': 4321,
                'year': 2016,
                'month': 8
            }),
            content_type='application/json'
        )
        res = self.app.get('/bills/2016/8')
        self.assertTrue(res.status_code == 200)
        data = json.loads(res.data)
        self.assertTrue(len(data) >= 1)

    def test_post_put_delete_bill(self):
        # POST.
        res = self.app.post(
            '/bills',
            data=json.dumps({
                'name': 'test',
                'amount': 1234,
                'year': 2016,
                'month': 8
            }),
            content_type='application/json'
        )

        self.assertTrue(res.status_code == 200)
        data = json.loads(res.data)
        self.assertTrue('_id' in data)
        _id = data['_id']

        # PUT.
        res = self.app.put(
            '/bills/%s' % _id, 
            data=json.dumps({
                'name': 'test',
                'amount': 12345
            }),
            content_type='application/json'
        )

        self.assertTrue(res.status_code == 200)
        self.assertTrue(json.loads(res.data)['amount'] == 12345)
        
        # DELETE.
        res = self.app.delete('/bills/%s' % _id)
        self.assertTrue(res.status_code == 204)

    def test_copy(self):
        res = self.app.post(
            '/copy',
            data=json.dumps({
                'year': 2016,
                'month': 9
            }),
            content_type='application/json'
        )

        self.assertTrue(res.status_code == 200)
        data = json.loads(res.data)
        self.assertTrue('msg' not in data)
        self.assertTrue(len(data) >= 1)

if __name__ == '__main__':
    unittest.main()
