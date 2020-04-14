import os

import requests
from flask import Flask
from views import authentication
from views.attraction_types import TypesView
from views.attractions import AttractionsView
from views.cities import CitiesView
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

application.add_url_rule('/api/v1/cities', methods=['GET'],
                         view_func=CitiesView.as_view('CitiesListInfo'))

application.add_url_rule('/api/v1/attractions', methods=['GET'],
                         view_func=AttractionsView.as_view('AttractionsSearch'))


# @application.route('/')
# def index():
#     """
#     @api {GET} / Get IndexPage
#     @apiVersion 1.0.0
#
#     @apiName IndexPage
#     @apiGroup IndexPage
#
#     @apiSuccess {WebPage} index_page    Returns our start page.
#     """
#     index_url = os.environ.get('AWS_INDEX_URL', '')
#     if not index_url:
#         return "Missing environment variable"
#     response = requests.get(index_url)
#     return response.content

@application.route('/', defaults={'path': ''})
@application.route('/<path:path>')
def catch_all(path):
    index_url = os.environ.get('AWS_INDEX_URL', '')
    if not index_url:
        return "Missing environment variable"
    response = requests.get(index_url)
    return response.content

if __name__ == '__main__':
    application.run(os.getenv('IP', "0.0.0.0"),
                    port=(os.getenv("PORT", "5000")),
                    debug=True)
