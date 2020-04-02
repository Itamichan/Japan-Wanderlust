import os
import re

from flask import Flask, request, jsonify
from database import Database, User

application = Flask("japan-wanderlust")

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

        @apiSuccess {String} welcomeMessage Personalised welcome message

        @apiSuccessExample {json} Success-Response:
        {}

        @apiError (Unauthorized 401) {Object} InvalidPassword
        @apiError (Unauthorized 401) {Object} InvalidFirstname
        @apiError (Unauthorized 401) {Object} InvalidLastname
        @apiError (Unauthorized 401) {Object} InvalidUsername
        @apiError (Unauthorized 401) {Object} UnavailableUsername
        @apiError (Unauthorized 401) {Object} InvalidEmailFormat
        @apiError (InternalServerError 500) {Object} InternalServerError

    """
    username = request.json['username']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    password = request.json['password']
    email = request.json['email']
    try:
        """
        password should have at least 8 characters can contain any char except white space
        username should have at least 2 characters and maximum 25, can contain any char except white space
        firstname should have at least 1 character and maximum 25, can contain any capital or small letter
        lastname should have at least 1 character and maximum 25, can contain any capital or small letter
        email should have an "@" sign and a email domain name with a domain ending of at least 2 characters
        
        """
        password_match = r"^[\S]{8,}$"
        username_match = r'^[\S]{2,25}$'
        firstname_match = r'[a-zA-Z]{1,25}$'
        lastname_match = r'[a-zA-Z]{1,25}$'
        email_match = r'([\w\.\-]+)@([\w]+)\.([\w]+){2,}'

        db_instance = Database()
        user = db_instance.get_user_by_name(username)

        # password should be at least 8 characters long
        if re.search(password_match, password) is None:
            raise AssertionError('invalid password')

        if re.search(username_match, username) is None:
            raise AssertionError('invalid username')

        if re.search(firstname_match, firstname) is None:
            raise AssertionError('invalid firstname')

        if re.search(lastname_match, lastname) is None:
            raise AssertionError('invalid lastname')

        if user:
            raise AssertionError('username already taken')

        if not email or not re.fullmatch(email_match, email):
            raise AssertionError('invalid email format')

        db_instance.create_user(username, firstname, lastname, email, password)
        response = jsonify({})
        return response

    except AssertionError as a:
        response = jsonify({
            'error': 'Unauthorized',
            'description': str(a)
        })
        response.status_code = 401
        return response

    except Exception as e:
        print(e)
        response = jsonify({'error': 'unknown error', 'description': 'internal server error'})
        response.status_code = 500
        return response

    """
    delete /api/v1/users delete a user
    
    post /api/v1/token login with username and password/ get the token back
    post /api/v1/token/verify checks that the token is still valid
    
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