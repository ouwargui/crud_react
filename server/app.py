from flask import Flask, Blueprint, request
from flask.wrappers import Response
from flask_restful import Api
from database.db import db

from resources.User import User, UserList, UserAuthentication, UpdateUser
from resources.Sneakers import Sneaker, SneakerList, SneakerId

app = Flask(__name__)
bluePrint = Blueprint('api', __name__, url_prefix='/api')
api = Api(bluePrint)
app.register_blueprint(bluePrint)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

@app.before_first_request
def create_tables():
    db.create_all()

@app.after_request
def after_request(response: Response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    response.mimetype = 'application/json'
    return response


api.add_resource(User, '/user')
api.add_resource(UserList, '/users')
api.add_resource(UserAuthentication, '/authenticate')
api.add_resource(UpdateUser, '/user/update')
api.add_resource(Sneaker, '/sneaker')
api.add_resource(SneakerList, '/sneakers')
api.add_resource(SneakerId, '/sneaker/id')

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)