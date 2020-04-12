import os

from flask import Flask
from views import authentication
from views.attraction_types import TypesView
from views.trip_attractions import TripAttractionsView
from views.trips import TripsView

application = Flask("japan-wanderlust")

# gets the value for our secret key which we will use for jwt
SECRET_KEY = os.environ.get('SECRET_KEY')

# registration of handlers for register and login
application.add_url_rule('/api/v1/users', methods=['POST'], view_func=authentication.register)
application.add_url_rule('/api/v1/token', methods=['POST'], view_func=authentication.login)
application.add_url_rule('/api/v1/token/verify', methods=['POST'], view_func=authentication.verify_token)

application.add_url_rule('/api/v1/trips/<trip_id>', methods=['GET', 'PATCH', 'DELETE'], view_func=TripsView.as_view('TripInfo'))
application.add_url_rule('/api/v1/trips', methods=['GET', 'POST'], view_func=TripsView.as_view('TripsListInfo'))

application.add_url_rule('/api/v1/trips/<trip_id>/attractions', methods=['GET'],
                         view_func=TripAttractionsView.as_view('AttractionsListInfo'))
application.add_url_rule('/api/v1/trips/<trip_id>/attractions/<attraction_id>', methods=['POST', 'DELETE'],
                         view_func=TripAttractionsView.as_view('AttractionsInfo'))

application.add_url_rule('/api/v1/types', methods=['GET'],
                         view_func=TypesView.as_view('TypesListInfo'))



if __name__ == '__main__':
    application.run(os.getenv('IP', "0.0.0.0"),
                    port=(os.getenv("PORT", "5000")),
                    debug=True)