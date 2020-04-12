from unittest.case import TestCase
from run import application


class GenericTest(TestCase):
    """ A generic test class that makes the client availbale """


    def setUp(self) -> None:
        self.client = application.test_client()
