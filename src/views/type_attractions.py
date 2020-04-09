from flask import jsonify, request
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500, response_404


class TypeAttractionsView(MethodView):

    def get(self, type_id, attraction_id):
        """

        @api {GET} /api/v1/types/<type_id>/attractions/<attraction_id> Attractions Information
        @apiVersion 1.0.0

        @apiName AttractionsInfo
        @apiGroup Attractions

        @apiSuccess {Object[]} attractions                    List with attractions
        @apiSuccess {String} attractions.id                   Attraction's id
        @apiSuccess {String} attractions.attraction_name      Attraction's name
        @apiSuccess {String} attractions.description          Attraction's description
        @apiSuccess {Integer} attractions.price               Attraction's price
        @apiSuccess {String} attractions.web_link             Attraction's web_link
        @apiSuccess {String} attractions.picture_url          Attraction's picture_url
        @apiSuccess {Integer} attractions.city_id             Attraction's city_id

        @apiSuccessExample {json} Success-Response:
        # todo add proper url examples
        HTTP/1.1 200 OK
        {
            "attractions":
            [
                {
                    "id": 1
                    "attraction_name": "Fuji Mountain"
                    "description": "Highest mountain in Japan."
                    "price": 200
                    "web_link": ""
                    "picture_url": ""
                    "city_id": 10
                },
                {
                    "id": 1
                    "attraction_name": "Osaka Tower"
                    "description": "The tower was 160 meters (525 feet) high."
                    "price": 130
                    "web_link": ""
                    "picture_url": ""
                    "city_id": 5
                }
            ]
         }

        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = AttractionsDatabase()
            attractions_list = db_instance.get_attractions_from_type(type_id, attraction_id)
            db_instance.close_connection()

            return jsonify({
                "attractions": [e.serialize() for e in attractions_list]
            })
        except:
            return response_500()
