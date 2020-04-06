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

application.add_url_rule('/api/v1/trips/<trip_id>', methods=['GET', 'DELETE'], view_func=TripsView.as_view('TripInfo'))
application.add_url_rule('/api/v1/trips', methods=['GET', 'POST'], view_func=TripsView.as_view('TripsListInfo'))


"""


get /api/v1/attractions get attractions info




"""


if __name__ == '__main__':
    application.run(os.getenv('IP', "0.0.0.0"),
                    port=(os.getenv("PORT", "5000")),
                    debug=True)