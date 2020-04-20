import re

from flask import jsonify, request
from flask.views import MethodView
from database.trips_database import TripsDatabase
from database.users_database import User
from decorators import validate_token
from errors import response_500, response_404, response_400


class TripsView(MethodView):

    def get_trip_info(self, user, trip_id):
        """

        @api {GET} /api/v1/trips/<trip_id> Trip information
        @apiVersion 1.0.0

        @apiName TripInfo
        @apiGroup Trips

        @apiSuccess {Integer}   id              Trip's id
        @apiSuccess {String}    name            Trip's name
        @apiSuccess {Integer}   user_id         Trip's user_id
        @apiSuccess {Integer}   max_trip_days   Trip's max_trip_days
        @apiSuccess {Boolean}   is_guided       Trip's is_guided
        @apiSuccess {Boolean}   in_group        Trip's in_group
        @apiSuccess {Integer}   max_price       Trip's max_price

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "id": 1,
            "name": "Short Travel",
            "user_id": 1,
            "max_trip_days": 20,
            "is_guided": True,
            "in_group": False,
            "max_price": 10000
         }

        @apiError (NotFound 404) {Object} NoSuchTrip
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = TripsDatabase()
            trip_info = db_instance.trip_info(user.id, trip_id)
            db_instance.close_connection()

            if not trip_info:
                return response_404("NoSuchTrip", "Such trip doesn't exist")

            return jsonify(trip_info.serialize())

        except:
            return response_500()

    def get_trips_list(self, user):
        """

        @api {GET} /api/v1/trips Trips List
        @apiVersion 1.0.0

        @apiName TripsList
        @apiGroup Trips

        @apiSuccess {Object[]} trips                    List with trips
        @apiSuccess {Integer} trips.id              Trip's id
        @apiSuccess {String} trips.name             Trip's name
        @apiSuccess {Integer} trips.user_id         Trip's user_id
        @apiSuccess {Integer} trips.max_trip_days   Trip's max_trip_days
        @apiSuccess {Boolean} trips.is_guided       Trip's is_guided
        @apiSuccess {Boolean} trips.in_group        Trip's in_group
        @apiSuccess {Integer} trips.max_price       Trip's max_price

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "trips":
            [
                {
                    "id": 1,
                    "name": "Short Travel",
                    "user_id": 1,
                    "max_trip_days": 20,
                    "is_guided": True,
                    "in_group": False,
                    "max_price": 10 000
                },
                {
                    "id": 2,
                    "name": "Dream Trip",
                    "user_id": 1,
                    "max_trip_days": 30,
                    "is_guided": True,
                    "in_group": True,
                    "max_price": 200 000
                }
            ]
         }

        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = TripsDatabase()
            trips_list = db_instance.trips_list(user.id)
            db_instance.close_connection()

            return jsonify({
                "trips": [trip.serialize() for trip in trips_list]
            })

        except:
            return response_500()

    @validate_token
    def post(self, user: User = None):
        """

        @api {POST} /api/v1/trips Trip creation
        @apiVersion 1.0.0

        @apiName CreateTrip
        @apiGroup Trips

        @apiParam {String} name                 Trip's name
        @apiParam {Integer} max_trip_days       Trip's max_trip_days
        @apiParam {Boolean} is_guided           Trip's is_guided
        @apiParam {Boolean} in_group            Trip's in_group
        @apiParam {Integer} max_price           Trip's max_price

        @apiSuccess {Integer} trip_id           The id of the created trip

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "id": 1,
            "name": "Short Travel",
            "user_id": 1,
            "max_trip_days": 20,
            "is_guided": True,
            "in_group": False,
            "max_price": 10000
         }

        @apiError (BadRequest 400) {Object} InvalidName                     Name should have at least 2 characters and maximum 25, it can contain any char except new line.
        @apiError (BadRequest 400) {Object} InvalidDaysNumber               Please provide valid max_trip_days value.
        @apiError (BadRequest 400) {Object} InvalidPriceNumber              Please provide a valid max_price value.
        @apiError (BadRequest 400) {Object} InvalidDataEntry
        @apiError (BadRequest 400) {Object} ParameterError                  Please provide all the parameters
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            name = request.json['name']
            max_trip_days = int(request.json['max_trip_days'])
            is_guided = bool(request.json['is_guided'])
            in_group = bool(request.json['in_group'])
            max_price = int(request.json['max_price'])

            # checks that the passed values are valid
            if not re.match(r'^[\S]{2,25}$', name):
                return response_400('InvalidName', 'Name should have at least 2 characters and maximum 25, '
                                                   'it can contain any char except new line.')

            if max_trip_days < 1 or max_trip_days > 30:
                return response_400("InvalidDaysNumber", "Please provide valid max_trip_days value.")

            if max_price < 1 or max_price > 1000000:
                return response_400("InvalidPriceNumber", "Please provide a valid max_price value.")

            db_instance = TripsDatabase()
            new_trip = db_instance.trip_create(name, user.id, max_trip_days, is_guided, in_group, max_price)
            db_instance.close_connection()
            if not new_trip:
                return response_400("BadRequest", "Invalid data entry")

            return jsonify({new_trip.serialize()})

        except KeyError:
            return response_400("ParameterError", "Please provide all the parameters")
        except:
            return response_500()

    @validate_token
    def get(self, user: User = None, trip_id: int = None):
        if trip_id:
            return self.get_trip_info(user, trip_id)
        else:
            return self.get_trips_list(user)

    @validate_token
    def patch(self, trip_id, user: User = None):
        """

        @api {PATCH} /api/v1/trips/trip_id Trip update
        @apiVersion 1.0.0

        @apiName TripUpdate
        @apiGroup Trips

        @apiParam {String} [name]                 Trip's name
        @apiParam {Integer} [max_trip_days]       Trip's max_trip_days
        @apiParam {Boolean} [is_guided]           Trip's is_guided
        @apiParam {Boolean} [in_group]            Trip's in_group
        @apiParam {Integer} [max_price]           Trip's max_price

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {}

        @apiError (BadRequest 400) {Object} NoParameter                     Please provide a parameter.
        @apiError (BadRequest 400) {Object} InvalidName                     Name should have at least 2 characters and maximum 25, it can contain any char except new line.
        @apiError (BadRequest 400) {Object} InvalidDaysNumber               Please provide valid max_trip_days value.
        @apiError (BadRequest 400) {Object} InvalidPriceNumber              Please provide a valid max_price value.
        @apiError (NotFound 404) {Object} NoSuchTrip                        Such trip doesn't exist
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            changed_fields = {}

            for key in ["name", "is_guided", "max_trip_days", "in_group", "max_price"]:
                value = request.json.get(key, None)

                if value is not None:
                    changed_fields[key] = value

            if len(changed_fields) == 0:
                return response_400("NoParameter", "Please provide a parameter")

            # checks that the passed values are valid
            if not re.match(r'^[.]{2,25}$', changed_fields["name"]):
                return response_400('InvalidName', 'Name should have at least 2 characters and maximum 25, it can '
                                                   'contain any char except new line.')

            if "max_trip_days" in changed_fields and changed_fields["max_trip_days"] < 1 or changed_fields[
                "max_trip_days"] > 30:
                return response_400("InvalidDaysNumber", "Please provide valid max_trip_days value")

            if "max_price" in changed_fields and changed_fields["max_price"] < 1 or changed_fields[
                "max_price"] > 1000000:
                return response_400("InvalidPriceNumber", "Please provide a valid max_price value")

            db_instance = TripsDatabase()
            updated_trip = db_instance.update_trip(trip_id, user.id, changed_fields)
            db_instance.close_connection()

            if not updated_trip:
                return response_404("NoSuchTrip", "Such trip doesn't exist")

            return jsonify({})

        except:
            return response_500()

    @validate_token
    def delete(self, trip_id: int, user: User = None):
        """

        @api {DELETE} /api/v1/trips/trip_id Trip deletion
        @apiVersion 1.0.0

        @apiName DeleteTrip
        @apiGroup Trips

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {}

        @apiError (NotFound 404) {Object} NoSuchTrip                        Such trip doesn't exist
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = TripsDatabase()
            deleted_trip = db_instance.trip_delete(user.id, trip_id)
            db_instance.close_connection()

            if not deleted_trip:
                return response_404("NoSuchTrip", "Such trip doesn't exist")

            return jsonify({})

        except:
            return response_500()
