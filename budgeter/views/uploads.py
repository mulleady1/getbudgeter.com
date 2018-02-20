import logging
from os.path import join
from bson.objectid import ObjectId
from datetime import datetime
from dateutil import parser
from flask import abort, request, session
from flask.views import MethodView
from budgeter import app, mongo, make_json_response, nums

class Uploads(MethodView):

    def get(self):
        print('%s /uploads', request.method)
        if 'user_id' not in session:
            abort(401)

        user_id = session['user_id']
        params = {
            'user_id': user_id
        }

        uploads = list(mongo.db.uploads.find(params))
        for upload in uploads:
            upload['_id'] = str(upload['_id'])
            upload['created'] = str(upload['created'])
            filename = join(app.config['UPLOAD_FOLDER'], upload['filename'])
            upload['data'] = nums.crunch([filename])

        return make_json_response(uploads)

    def post(self):
        print('%s /uploads', request.method)
        if 'user_id' not in session:
            abort(401)

        print('request.files: ', request.files)
        user_id = session['user_id']
        file = request.files['file']
        filename = file.filename
        print('filename: ', filename)

        if mongo.db.uploads.find_one({ 'filename': filename }):
            return ('Should have PUT', 400)

        file.save(join(app.config['UPLOAD_FOLDER'], filename))

        upload = {
            'user_id': user_id,
            'filename': filename,
            'created': datetime.utcnow()
        }

        mongo.db.uploads.save(upload, True)
        upload['_id'] = str(upload['_id'])
        upload['created'] = str(upload['created'])
        return make_json_response(upload)

    def put(self, id):
        print('%s /uploads/<id>/', request.method)
        if 'user_id' not in session:
            abort(401)
        user_id = session['user_id']
        upload = request.get_json()
        print('Looking for upload %s', id)
        if mongo.db.uploads.find_one(ObjectId(id)) is None:
            print('Not found')
            return ('Upload not found', 400)
        print('Found')
        upload['user_id'] = user_id
        upload['due'] = parser.parse(upload['due'])
        upload['_id'] = ObjectId(id)
        mongo.db.uploads.save(upload, True)
        upload['_id'] = str(id)
        upload['due'] = str(upload['due'])
        return make_json_response(upload)

    def delete(self, id):
        print('%s /uploads/%s/', request.method, id)
        if 'user_id' not in session:
            abort(401)
        if mongo.db.uploads.find_one(ObjectId(id)) is None:
            return ('Upload not found', 400)

        mongo.db.uploads.remove(ObjectId(id))
        return ('', 204)

app.add_url_rule('/uploads', view_func=Uploads.as_view('uploads_1'))
app.add_url_rule('/uploads/<id>', view_func=Uploads.as_view('uploads_2'))
