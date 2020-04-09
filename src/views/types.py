from flask import jsonify, request
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500, response_404


class TypesView(MethodView):

    def get(self):
        """

        @api {GET} /api/v1/types/<type_id> Get Type
        @apiVersion 1.0.0

        @apiName GetType
        @apiGroup Attractions

        @apiSuccess {String} type_name      Attraction's type name

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "type_name": "temples"
        }

        @apiError (NotFound 404) {Object} NoSuchType    Such type doesn't exist.
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            type_id = int(request.args.get('type_id', None))

            db_instance = AttractionsDatabase()
            type_name = db_instance.get_type(type_id)
            db_instance.close_connection()

            if not type_name:
                return response_404("NoSuchType", "Such type doesn't exist")

            return jsonify({
                "type_name": type_name
            })
        except:
            return response_500()
