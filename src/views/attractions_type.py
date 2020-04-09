from flask import jsonify, request
from flask.views import MethodView

from database.attractions_database import AttractionsDatabase
from errors import response_500, response_404


class AttractionsTypeView(MethodView):

    def get(self):
        """

        @api {GET} /api/v1/attraction_type/<type_id> Get Attraction's Type
        @apiVersion 1.0.0

        @apiName GetAttractionType
        @apiGroup Attractions

        @apiSuccess {String} type_name      Attraction's type name

        @apiSuccessExample {json} Success-Response:
        HTTP/1.1 200 OK
        {
            "attraction_type_name": "temples"
        }

        @apiError (NotFound 404) {Object} NoSuchAttractionType    Such attraction type doesn't exist.
        @apiError (InternalServerError 500) {Object} InternalServerError

        """
        try:
            type_id = int(request.args.get('type_id', None))

            db_instance = AttractionsDatabase()
            attraction_type_name = db_instance.get_attraction_type(type_id)
            db_instance.close_connection()

            if not attraction_type_name:
                return response_404("NoSuchAttractionType", "Such attraction type doesn't exist")

            return jsonify({
                "attraction_type_name": attraction_type_name
            })
        except:
            return response_500()
