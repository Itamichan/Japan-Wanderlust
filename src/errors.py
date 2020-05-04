from flask import jsonify


def json_response(status_code, error, message):
    response = jsonify({'error': error, 'description': message})
    response.status_code = status_code
    return response


def response_500():
    return json_response(500, 'InternalServerError', 'Something Went Wrong')


def response_401(message):
    return json_response(401, 'Unauthorized', message)


def response_400(error, message):
    return json_response(400, error, message)


def response_404(error, message):
    return json_response(404, error, message)