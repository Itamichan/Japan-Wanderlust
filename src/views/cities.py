from flask import jsonify
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500


class CitiesView(MethodView):

    def get(self):
        """

        @api {GET} /api/v1/cities/ Get Cities
        @apiVersion 1.0.0

        @apiName GetCities
        @apiGroup Attractions

        @apiSuccess {Object[]} cities      List with all cities
        @apiSuccess {Integer} city_id      City id
        @apiSuccess {String} city_name     City name

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
           "cities": [
                {
                    "city_id": 1,
                    "city_name": "Tokyo"
                },
                {
                    "city_id": 2,
                    "city_name": "Osaka"
                }
            ]
        }

        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = AttractionsDatabase()
            cities_list = db_instance.get_cities()
            db_instance.close_connection()

            return jsonify({
                "cities": cities_list
            })
        except:
            return response_500()
