from unittest.case import TestCase
from run import application


class GenericTest(TestCase):
    """ A generic test class that makes the client availbale """



    def setUp(self) -> None:
        """
application.test_client() is a test client from flask - helps us to simulate requests from the client side
        """
        self.client = application.test_client()
