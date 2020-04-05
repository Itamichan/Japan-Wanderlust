import os

from flask import Flask

import authentication

application = Flask("japan-wanderlust")

# gets the value for our secret key which we will use for jwt
SECRET_KEY = os.environ.get('SECRET_KEY')

# registration of handlers for register and login
application.add_url_rule('/api/v1/users', methods=['POST'], view_func=authentication.register)
application.add_url_rule('/api/v1/token', methods=['POST'], view_func=authentication.login)
application.add_url_rule('/api/v1/token/verify', methods=['POST'], view_func=authentication.verify_token)

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