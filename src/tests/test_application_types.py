from database.database import Database
from tests.GenericTest import GenericTest, with_app_context
class TestApplicationTypes(GenericTest):
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
                    'type_name': 'Nature'
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
        self.assertEqual(rv.status, 200)