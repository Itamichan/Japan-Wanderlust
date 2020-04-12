from database.database import Database
from tests.GenericTest import GenericTest, with_app_context


class TestApplicationTypes(GenericTest):

    def setUp(self) -> None:
        db = Database()
        with db.connection.cursor() as c:
            c.execute("SAVEPOINT test_savepoint")
            db.connection.commit()

    def tearDown(self) -> None:
        db = Database()
        with db.connection.cursor() as c:
            c.execute("ROLLBACK TO SAVEPOINT test_savepoint")
            db.connection.commit()

    @with_app_context
    def test_no_attraction_types(self):
        """Start with a blank database."""
        rv = self.client.get('/api/v1/types')
        self.assertDictEqual(rv.json, {
            'attractions': []
        })

    @with_app_context
    def test_getting_attraction_types_back(self):
        """Start with a blank database."""
        db = Database()
        with db.connection.cursor() as c:
            c.execute("INSERT INTO attraction_type (id, name) VALUES (1, %s)", ["nature"])
            db.connection.commit()
        # API Call
        rv = self.client.get('/api/v1/types')
        # Verifying the response
        self.assertDictEqual(rv.json, {
            'attractions': [
                {
                    'type_id': 1,
                    'type_name': 'nature'
                }
            ]
        })


    @with_app_context
    def test_getting_attraction_types_back2(self):
        """Start with a blank database."""
        # API Call
        rv = self.client.post('/api/v1/users', json={
            'username': 'username',
            'password': 'passwooooooord',
            'email': 'email@email.com',
        })
        self.assertEqual(rv.status_code, 200)
