from flask import jsonify, request
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
    def patch(self, trip_id, user: User = None):
        # todo api docs
        try:
            changed_fields = {}

            for key in ["name", "is_guided", "max_trip_days", "in_group", "max_price"]:
                value = request.json.get(key, None)

                if value is not None:
                    changed_fields[key] = value

            if len(changed_fields) == 0:
                return response_400("NoParameter", "Please provide a parameter")

            # checks that the passed values are valid
            if "name" in changed_fields and len(changed_fields["name"]) < 1 or len(changed_fields["name"]) > 15:
                return response_400("InvalidName", "Please provide a valid name")

            if "max_trip_days" in changed_fields and changed_fields["max_trip_days"] < 1 or changed_fields[
                "max_trip_days"] > 30:
                return response_400("InvalidDaysNUmber", "Please provide valid max_trip_days value")

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
            deleted_trip = db_instance.trip_delete(user.id, trip_id)
            db_instance.close_connection()

            if not deleted_trip:
                return response_404("NoSuchTrip", "Such trip doesn't exist")

            return jsonify({})
        except:
            return response_500()

    @validate_token
    def post(self, user: User = None):
        # todo api docs
        try:
            # tries to get the value if none provided returns an emtpy string
            # todo check that the entries are correct like word length, minim,max nr

            name = request.json['name']
            max_trip_days = int(request.json['max_trip_days'])
            is_guided = bool(request.json['is_guided'])
            in_group = bool(request.json['in_group'])
            max_price = int(request.json['max_price'])

            db_instance = TripsDatabase()
            new_trip = db_instance.trip_create(name, user.id, max_trip_days, is_guided, in_group, max_price)
            db_instance.close_connection()
            if not new_trip:
                return response_400("BadRequest", "Invalid data entry")
            return jsonify({'trip_id': new_trip})
        except KeyError:
            return response_400("ParameterError", "Please provide all the parameters")
        except:
            return response_500()

# patch /api/v1/trips/<id> updates a trip list

# get /api/v1/trips/<id>/attractions

# post /api/v1/trips/<id>/attractions/<id>
# delete /api/v1/trips/<id>/attractions/<id>
