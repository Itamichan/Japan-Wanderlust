import os

import jwt
from flask import request

from database.users_database import UserDatabase
from errors import response_401

SECRET_KEY = os.environ.get('SECRET_KEY')


def validate_token(f):
    def _wrapper(*args, **kwargs):

        try:
            auth = request.headers.get('Authorization')
            auth_token = auth.split()[1]
            auth_token_decoded = jwt.decode(auth_token, SECRET_KEY, verify=True)
            user_id = auth_token_decoded['id']

            db_instance = UserDatabase()
            user = db_instance.get_user_by_id(user_id)
            db_instance.close_connection()

            kwargs['user'] = user

            return f(*args, **kwargs)

        except:
            return response_401('Invalid token')

    return _wrapper
