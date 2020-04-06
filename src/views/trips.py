from flask import jsonify
from flask.views import MethodView

from database.trips_database import TripsDatabase
from database.users_database import User
from decorators import validate_token
from errors import response_500, response_404, response_400


class TripsView(MethodView):

    def fetch(self, user, trip_id):
        # todo api docs
        try:
            db_instance = TripsDatabase()
            trip_info = db_instance.trip_info(user.id, trip_id)
            db_instance.close_connection()

            if not trip_info:
                return response_404("NoSuchTrip", "Such trip doesn't exist")

            return jsonify(trip_info.serialize())
        except:
            return response_500()

    def list(self, user):
        # todo api docs
        try:
            db_instance = TripsDatabase()
            trips_list = db_instance.trips_list(user.id)
            db_instance.close_connection()

            return jsonify({
                "trips": [e.serialize() for e in trips_list]
            })
        except:
            return response_500()

    @validate_token
    def post(self, name, max_trip_days, is_guided, in_group, max_price, user: User = None):
        # todo api docs
        try:
            db_instance = TripsDatabase()
            new_trip = db_instance.trip_create(name, user.id, max_trip_days, is_guided, in_group, max_price)
            db_instance.close_connection()
            if not new_trip:
                return response_400("BadRequest", "Invalid data entry")
            return jsonify({'trip_id': new_trip})
        except:
            return response_500()

    @validate_token
    def get(self, user: User = None, trip_id: int = None):
        if trip_id:
            return self.fetch(user, trip_id)
        else:
            return self.list(user)

    @validate_token
    def delete(self, trip_id: int, user: User = None):
        # todo api docs
        try:
            db_instance = TripsDatabase()
            delete_trip = db_instance.trip_delete(user.id, trip_id)
            db_instance.close_connection()
            if delete_trip == 'true':
                return jsonify({})
            else:
                return response_404("NoSuchTrip", "Such trip doesn't exist")
        except:
            return response_500()


# patch /api/v1/trips/<id> updates a trip list

