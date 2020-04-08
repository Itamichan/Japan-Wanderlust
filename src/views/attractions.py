from flask import jsonify
from flask.views import MethodView
from psycopg2._psycopg import IntegrityError
from psycopg2.errorcodes import UNIQUE_VIOLATION
from database.attractions_database import AttractionsDatabase
from database.trips_database import TripsDatabase
from database.users_database import User
from decorators import validate_token
from errors import response_500, response_404, response_400


class AttractionsView(MethodView):

    @validate_token
    def post(self, trip_id, attraction_id, user: User = None):
        # todo api docs
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

        except UNIQUE_VIOLATION:
            return response_400("AttractionAlreadyExists", "Please provide a new attraction to the trip")
        except IntegrityError:
            return response_400("InvalidReference", "Please provide a valid trip_list_id or attraction_id")
        except:
            return response_500()

    @validate_token
    def get(self, trip_id, attraction_id, user: User = None):
        try:
            # verification that the user has such a trip
            trips_db_instance = TripsDatabase()
            trip = trips_db_instance.trip_info(user.id, trip_id)
            if not trip:
                return response_404('NoSuchTrip', 'No such trip')

            db_instance = AttractionsDatabase()
            attractions_list = db_instance.get_attractions_from_trip(trip_id, attraction_id)
            db_instance.close_connection()

            return jsonify({
                "attractions": [e.serialize() for e in attractions_list]
            })
        except:
            return response_500()

    @validate_token
    def delete(self, trip_id, attraction_id, user: User = None):
        # todo api docs
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
        except:
            return response_500()

