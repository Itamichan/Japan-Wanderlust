from functools import wraps
from unittest.case import TestCase
from run import application


def with_app_context(f):
    @wraps(f)
    def _wrapper(*args, **kwargs):
        with application.app_context():
            f(*args, **kwargs)

    return _wrapper


class GenericTest(TestCase):
    """ A generic test class that can be used - which automatically creates the database with all the migrations """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def setUp(self) -> None:
        self.client = application.test_client()
