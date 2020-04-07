from flask import jsonify
from flask.views import MethodView
from database.attractions_database import AttractionsDatabase
from database.users_database import User
from decorators import validate_token
from errors import response_500, response_404, response_400


class AttractionsView(MethodView):

    @validate_token
    def post(self, trip_list_id, attraction_id, user: User = None):
        # todo api docs
        try:

            db_instance = AttractionsDatabase()
            added_attraction_id = db_instance.add_attraction_to_trip(trip_list_id, attraction_id,)
            db_instance.close_connection()
            if not added_attraction_id:
                return response_400("BadRequest", "Invalid data entry")
            return jsonify({'added_attraction_id': added_attraction_id})
        except:
            return response_500()

    @validate_token
    def get(self, trip_list_id, attraction_id, user: User = None):
        try:
            db_instance = AttractionsDatabase()
            attractions_list = db_instance.get_attractions_from_trip(trip_list_id, attraction_id)
            db_instance.close_connection()

            return jsonify({
                "attractions": [e.serialize() for e in attractions_list]
            })
        except:
            return response_500()

    @validate_token
    def delete(self, trip_list_id, trip_attraction_match_id, user: User = None):
        # todo api docs
        try:
            db_instance = AttractionsDatabase()
            deleted_attraction = db_instance.remove_attraction_from_trip(trip_list_id, trip_attraction_match_id)
            db_instance.close_connection()

            if not deleted_attraction:
                return response_404("NoSuchAttraction", "Such attraction doesn't exist")

            return jsonify({})
        except:
            return response_500()


# patch /api/v1/trips/<id> updates a trip list

# get /api/v1/trips/<id>/attractions

# post /api/v1/trips/<id>/attractions/<id>
# delete /api/v1/trips/<id>/attractions/<id>
