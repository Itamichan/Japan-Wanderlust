import datetime
import os
import re

import jwt
from flask import request, jsonify
from psycopg2._psycopg import IntegrityError

from database.users_database import UserDatabase
from errors import response_500, response_401, response_400

# gets the value for our secret key which we will use for jwt
SECRET_KEY = os.environ.get('SECRET_KEY')


def register():
    """

    @api {POST} /api/v1/users/ User registration
        @apiVersion 1.0.0

        @apiName PostUsers
        @apiGroup Authentication

        @apiParam {String{2..25}="\w"} username User's username.
        @apiParam {String{8..}} password User's password.
        @apiParam {String} email User's email.

        @apiSuccessExample {json} Success-Response:
        {}

        @apiError (Bad Request 400) {Object} InvalidPassword        Password should have at least 8 characters and can contain any char except white space.
        @apiError (Bad Request 400) {Object} InvalidUsername        Ussername should have at least 2 characters and maximum 25, it can contain any char except white space.
        @apiError (Bad Request 400) {Object} UnavailableUsername    Username is unavailable.
        @apiError (Bad Request 400) {Object} InvalidEmailFormat     Email should have an "@" sign and a email domain name with a domain ending of at least 2 characters.
        @apiError (InternalServerError 500) {Object} InternalServerError

    """

    try:
        # tries to get the value if none provided returns an emtpy string
        username = request.json.get('username', '')
        password = request.json.get('password', '')
        email = request.json.get('email', '')

        if not re.match(r"^[\S]{8,}$", password):
            return response_400('InvalidPassword',
                                'Password should have at least 8 characters and can contain any char except white space.')

        if not re.match(r'^[\S]{2,25}$', username):
            return response_400('InvalidUsername',
                                'Ussername should have at least 2 characters and maximum 25, it can contain any char except white space.')

        if not email or not re.fullmatch(r'([\w\.\-]+)@([\w]+)\.([\w]+){2,}', email):
            return response_400('InvalidEmailFormat',
                                'Email should have an "@" sign and a email domain name with a domain ending of at least 2 characters.')

        db_instance = UserDatabase()
        db_instance.create_user(username, email, password)
        db_instance.close_connection()
        return jsonify({})

    except IntegrityError as e:
        return response_400('UnavailableUsername', 'Username is unavailable.')

    except Exception as e:
        print(e)
        return response_500()


def login():
    """
        @api {POST} /api/v1/token/ User login
        @apiVersion 1.0.0

        @apiName UserLogin
        @apiGroup Authentication

        @apiParam {String} username User's username.
        @apiParam {String} password User's password.

        @apiSuccess {String} token User's jwt.
        # todo provide all key-values
        @apiSuccess {Object} user_info User's information.

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "token": "eyJ0eXA..."
        }

       @apiError (Unauthorized 401 ) {Object} InvalidLogin Username or password is incorrect.

        """

    try:
        # tries to get the value if none provided returns an emtpy string
        username = request.json.get('username', '')
        password = request.json.get('password', '')

        db_instance = UserDatabase()
        user = db_instance.verify_user(username, password)
        db_instance.close_connection()

        if not user:
            return response_401('username or password incorrect')

        token_payload = {
            'id': user.id,
            'iat': datetime.datetime.now().astimezone(),
            'exp': datetime.datetime.now().astimezone() + datetime.timedelta(days=30)
        }
        token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'token': token.decode('ascii'),
            'user_info': user.user_info()
        })

    except Exception as e:
        print(e)
        return response_500()


def verify_token():
    """
        @api {POST} /api/v1/token/verify/ Token Verification
        @apiVersion 1.0.0

        @apiName VerifyToken
        @apiGroup Authentication

        @apiParam {String} token User's token.

        @apiSuccess {Object} user_info User's information
         # todo add the correct key value pairs
        @apiSuccess {String} user_info.first_name User's information

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
         {
            "user_info": {
                # todo add the correct key value pairs
                "username": "cristina23",
                "username": "cristina23",
                "username": "cristina23",
                "username": "cristina23",
                "username": "cristina23",
                "username": "cristina23",
            }
        }

       @apiError (Unauthorized 401 ) {Object} InvalidToken

        """

    try:
        # tries to get the value if none provided returns an emtpy string
        token = request.json.get('token', '')

        payload = jwt.decode(token, SECRET_KEY, verify=True)
        user_id = payload["id"]

        db_instance = UserDatabase()
        user = db_instance.get_user_by_id(user_id)
        db_instance.close_connection()

        if not user:
            return response_401('Please provide a valid token')

        return jsonify({'user_info': user.user_info()})

    except jwt.ExpiredSignatureError:
        return response_401('Expired Token')

    except Exception as e:
        print(e)
        return response_500()
