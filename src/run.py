import os
import re

import jwt
from flask import Flask, request, jsonify
from database import Database, User

application = Flask("japan-wanderlust")

# gets the value for our secret key which we will use for jwt
SECRET_KEY = os.environ.get('SECRET_KEY')


@application.route('/api/v1/users', methods=['POST'])
def register():
    """

    @api {POST} /api/v1/users/ User registration
        @apiVersion 1.0.0

        @apiDescription
        <p><b>password</b> should have at least 8 characters and can contain any char except white space.</p>
        <p><b>username</b> should have at least 2 characters and maximum 25, it can contain any char except white space.</p>
        <p><b>firstname</b> should have at least 1 character and maximum 25, it can contain any capital or small letter.</p>
        <p><b>lastname</b> should have at least 1 character and maximum 25, it can contain any capital or small letter.</p>
        <p><b>email</b> should have an "@" sign and a email domain name with a domain ending of at least 2 characters.</p>

        @apiName PostUsers
        @apiGroup Authentication

        @apiParam {String{2..25}="\w"} username User's username.
        @apiParam {String{1..25}="[a-zA-Z]"} firstname User's first name.
        @apiParam {String{1..25}="[a-zA-Z]"} lastname User's last name.
        @apiParam {String{8..}} password User's password.
        @apiParam {String} email User's email.

        @apiSuccessExample {json} Success-Response:
        {}

        @apiError (Unauthorized 400) {Object} InvalidPassword
        @apiError (Unauthorized 400) {Object} InvalidFirstname
        @apiError (Unauthorized 400) {Object} InvalidLastname
        @apiError (Unauthorized 400) {Object} InvalidUsername
        @apiError (Unauthorized 400) {Object} UnavailableUsername
        @apiError (Unauthorized 400) {Object} InvalidEmailFormat
        @apiError (InternalServerError 500) {Object} InternalServerError

    """

    try:
        # tries to get the value if none provided returns an emtpy string
        username = request.json.get('username', '')
        firstname = request.json.get('firstname', '')
        lastname = request.json.get('lastname', '')
        password = request.json.get('password', '')
        email = request.json.get('email', '')

        # checking if we already have such a username in our database
        db_instance = Database()
        user = db_instance.get_user_by_name(username)

        if not re.match(r"^[\S]{8,}$", password):
            raise AssertionError('invalid password')

        if not re.match(r'^[\S]{2,25}$', username):
            raise AssertionError('invalid username')

        if not re.match(r'[a-zA-Z]{1,25}$', firstname):
            raise AssertionError('invalid firstname')

        if not re.match(r'[a-zA-Z]{1,25}$', lastname):
            raise AssertionError('invalid lastname')

        if user:
            raise AssertionError('username already taken')

        if not email or not re.fullmatch(r'([\w\.\-]+)@([\w]+)\.([\w]+){2,}', email):
            raise AssertionError('invalid email format')

        db_instance.create_user(username, firstname, lastname, email, password)
        response = jsonify({})
        return response

    except AssertionError as a:
        response = jsonify({
            'error': 'Unauthorized',
            'description': str(a)
        })
        response.status_code = 400
        return response

    except Exception as e:
        print(e)
        response = jsonify({'error': 'unknown error', 'description': 'internal server error'})
        response.status_code = 500
        return response


@application.route('/api/v1/token', methods=['POST'])
def login():
    """
        @api {POST} /api/v1/token/ User login
        @apiVersion 1.0.0

        @apiName PostToken
        @apiGroup Authentication

        @apiParam {String} username User's username.
        @apiParam {String} password User's password.

        @apiSuccess {String} token User's jwt.

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

        database_instance = Database()
        user = database_instance.get_user_by_name(username)

        salt =
        hash_provided_password =

        if user and user.password == password:
            token = jwt.encode({'user': username, 'id': user.id}, SECRET_KEY, algorithm='HS256')
            return jsonify({'token': token.decode('ascii')})
        else:
            response = jsonify({'error': 'InvalidLogin', 'description': 'username or password incorrect'})
            response.status_code = 401
            return response

    except Exception as e:
        print(e)
        response = jsonify({'error': 'unknown error', 'description': 'internal server error'})
        response.status_code = 500
        return response




    """
    
    

    post /api/v1/token/verify checks that the token is still valid
    
    delete /api/v1/users delete a user
    
    post /api/v1/trips creation of a trip list
    get /api/v1/trips/<id> get trips info
    get /api/v1/trips get all user's trips
    patch /api/v1/trips/<id> updates a trip list
    delete /api/v1/trips/<id> delete a trip list
    
    get /api/v1/attractions get attractions info
    
    
    get /api/v1/trips/<id>/attractions
    
    post /api/v1/trips/<id>/attractions/<id>
    
    delete /api/v1/trips/<id>/attractions/<id>
    
    """


if __name__ == '__main__':
    application.run(os.getenv('IP', "0.0.0.0"),
                    port=(os.getenv("PORT", "5000")),
                    debug=True)