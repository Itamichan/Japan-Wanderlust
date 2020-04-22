from flask import jsonify, request
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500


class AttractionsView(MethodView):

    def get(self):
        """

        @api {GET} /api/v1/attractions Search Attractions
        @apiVersion 1.0.0

        @apiName SearchAttractions
        @apiGroup Attractions

        @apiParam {String} text                    User input which will be checked against the attraction's name
        @apiParam {Integer} attraction_type_id     Shows a specific category of attractions
        @apiParam {Integer} city_id                Shows attractions in a city
        @apiParam {Integer} max_price              Shows attractions up to a max price


        @apiSuccess {Object[]} attractions                      List with attractions
        @apiSuccess {String} attractions.id                     Attraction's id
        @apiSuccess {String} attractions.attraction_name        Attraction's name
        @apiSuccess {String} attractions.description            Attraction's description
        @apiSuccess {Integer} attractions.price                 Attraction's price
        @apiSuccess {String} attractions.web_link               Attraction's web_link
        @apiSuccess {String} attractions.picture_url            Attraction's picture_url
        @apiSuccess {Object} attractions.city                   Attraction's city dictionary
        @apiSuccess {Integer} city.id                           Attraction's city id
        @apiSuccess {String} city.name                          Attraction's city name

        @apiSuccessExample {json} Success-Response:
        # todo add proper url examples
        HTTP/1.1 200 OK
        {
            "attractions": [
                {
                    "id": 1,
                    "attraction_name": "Fuji Mountain",
                    "description": "Highest mountain in Japan.",
                    "price": 200,
                    "web_link": "",
                    "picture_url": "",
                    "city": {
                        "id": 1,
                        "name": "Tokyo"
                            }
                },
                {
                    "id": 1,
                    "attraction_name": "Osaka Tower",
                    "description": "The tower was 160 meters (525 feet) high.",
                    "price": 130,
                    "web_link": "",
                    "picture_url": "",
                    "city": {
                        "id": 2,
                        "name": "Osaka"
                            }
                }
            ]
         }

        @apiError (NotFound 404) {Object} NoSuchTrip    Such trip doesn't exist.
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            text = request.args.get('text', None)
            attraction_type_id = request.args.get('attraction_type_id', None)
            city_id = request.args.get('city_id', None)
            max_price = request.args.get('max_price', None)

            db_instance = AttractionsDatabase()
            attractions_list = db_instance.get_attractions(text, attraction_type_id, city_id, max_price)
            db_instance.close_connection()

            return jsonify({
                "attractions": [e.serialize() for e in attractions_list]
            })
        except Exception as e:
            print(e)
            return response_500()
