import psycopg2
from flask import jsonify
from flask.views import MethodView
from psycopg2._psycopg import IntegrityError
from database.attractions_database import AttractionsDatabase
from database.trips_database import TripsDatabase
from database.users_database import User
from decorators import validate_token
from errors import response_500, response_404, response_400


class TripAttractionsView(MethodView):

    @validate_token
    def post(self, trip_id, attraction_id, user: User = None):
        """

        @api {POST} /api/v1/trips/<trip_id>/attractions/<attraction_id> Add Attraction
        @apiVersion 1.0.0

        @apiName AddAttraction
        @apiGroup Attractions


        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {}

        @apiError (NotFound 404) {Object} NoSuchTrip                        Such trip doesn't exist.
        @apiError (BadRequest 400) {Object} AttractionAlreadyExists         Please provide a new attraction to the trip.
        @apiError (BadRequest 400) {Object} InvalidReference                Please provide a valid trip_list_id or attraction_id.
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            # verification that the user has such a trip
            trips_db_instance = TripsDatabase()
            trip = trips_db_instance.trip_info(user.id, trip_id)
            if not trip:
                return response_404('NoSuchTrip', 'No such trip')

            attr_db_instance = AttractionsDatabase()
            attr_db_instance.add_attraction_to_trip(trip_id, attraction_id)
            attr_db_instance.close_connection()
            return jsonify({})

        # raises the UniqueViolation error
        except psycopg2.errors.lookup("23505"):
            return response_400("AttractionAlreadyExists", "Please provide a new attraction to the trip")
        except IntegrityError:
            return response_400("InvalidReference", "Please provide a valid trip_list_id or attraction_id")
        except Exception as e:
            print(e)
            return response_500()

    @validate_token
    def get(self, trip_id, user: User = None):
        """

        @api {GET} /api/v1/trips/<trip_id>/attractions Attractions Information
        @apiVersion 1.0.0

        @apiName AttractionsInfo
        @apiGroup Attractions

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
            "attractions":
            [
                {
                    "id": 1
                    "attraction_name": "Fuji Mountain"
                    "description": "Highest mountain in Japan."
                    "price": 200
                    "web_link": ""
                    "picture_url": ""
                    "city": {
                        "id": 1,
                        "name": "Tokyo"
                            }
                },
                {
                    "id": 1
                    "attraction_name": "Osaka Tower"
                    "description": "The tower was 160 meters (525 feet) high."
                    "price": 130
                    "web_link": ""
                    "picture_url": ""
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
            # verification that the user has such a trip
            trips_db_instance = TripsDatabase()
            trip = trips_db_instance.trip_info(user.id, trip_id)
            if not trip:
                return response_404('NoSuchTrip', 'No such trip')

            db_instance = AttractionsDatabase()
            attractions_list = db_instance.get_attractions_from_trip(trip_id)
            db_instance.close_connection()

            return jsonify({
                "attractions": [e.serialize() for e in attractions_list]
            })
        except Exception as e:
            print(e)
            return response_500()

    @validate_token
    def delete(self, trip_id, attraction_id, user: User = None):
        """

        @api {DELETE} /api/v1/trips/<trip_id>/attractions/<attraction_id> Remove Attraction
        @apiVersion 1.0.0

        @apiName RemoveAttraction
        @apiGroup Attractions

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {}

        @apiError (NotFound 404) {Object} NoSuchTrip                        Such trip doesn't exist.
        @apiError (NotFound 404) {Object} NoSuchAttraction                  Such attraction doesn't exist.
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            # verification that the user has such a trip
            trips_db_instance = TripsDatabase()
            trip = trips_db_instance.trip_info(user.id, trip_id)
            if not trip:
                return response_404('NoSuchTrip', 'No such trip')

            db_instance = AttractionsDatabase()
            deleted_attraction = db_instance.remove_attraction_from_trip(trip_id, attraction_id)
            db_instance.close_connection()

            if not deleted_attraction:
                return response_404("NoSuchAttraction", "Such attraction doesn't exist")

            return jsonify({})
        except Exception as e:
            print(e)
            return response_500()

