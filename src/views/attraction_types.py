from flask import jsonify, request
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500, response_404


class TypesView(MethodView):

    def get(self):
        """

        @api {GET} /api/v1/types/ Get Attraction Types
        @apiVersion 1.0.0

        @apiName AttractionTypes
        @apiGroup Attractions

        @apiSuccess {Object[]} attraction_types             List with all attraction types
        @apiSuccess {Integer} attraction_types.type_id      Attraction type id
        @apiSuccess {String} attraction_types.type_name     Attraction type name

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
           "attraction_types": [
                {
                    "type_id": 1,
                    "type_name": "temples"
                },
                {
                    "type_id": 2,
                    "type_name": "shrines"
                }
            ]
        }

        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            db_instance = AttractionsDatabase()
            attraction_types_list = db_instance.get_attraction_types()
            db_instance.close_connection()

            return jsonify({
               "attraction_types": attraction_types_list
            })
        except Exception as e:
            print(e)
            return response_500()
