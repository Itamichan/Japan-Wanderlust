import os

from flask import Flask

from views import authentication
from views.trips import TripsView

application = Flask("japan-wanderlust")

# gets the value for our secret key which we will use for jwt
SECRET_KEY = os.environ.get('SECRET_KEY')

# registration of handlers for register and login
application.add_url_rule('/api/v1/users', methods=['POST'], view_func=authentication.register)
application.add_url_rule('/api/v1/token', methods=['POST'], view_func=authentication.login)
application.add_url_rule('/api/v1/token/verify', methods=['POST'], view_func=authentication.verify_token)

application.add_url_rule('/api/v1/trips/<trip_id>', view_func=TripsView.as_view('TripsView'))
application.add_url_rule('/api/v1/trips', view_func=TripsView.as_view('TripsView'))

"""


get /api/v1/attractions get attractions info


get /api/v1/trips/<id>/attractions

post /api/v1/trips/<id>/attractions/<id>

delete /api/v1/trips/<id>/attractions/<id>

"""


if __name__ == '__main__':
    application.run(os.getenv('IP', "0.0.0.0"),
                    port=(os.getenv("PORT", "5000")),
                    debug=True)