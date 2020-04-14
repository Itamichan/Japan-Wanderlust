from database.database import Database
from database.users_database import UserDatabase
from tests.GenericTest import GenericTest

class TestApplicationTypes(GenericTest):

    def test_no_attraction_types(self):
        """Start with a blank database."""
        response = self.client.get('/api/v1/types')
        self.assertDictEqual(response.json, {
            'attraction_types': []
        })

    def test_getting_attraction_types_back(self):
        """Start with a blank database."""
        db = Database()
        with db.connection.cursor() as c:
            c.execute("INSERT INTO attraction_type (id, name) VALUES (1, %s)", ["nature"])
            db.connection.commit()
        # API Call
        response = self.client.get('/api/v1/types')
        # Verifying the response
        self.assertDictEqual(response.json, {
            'attraction_types': [
                {
                    'type_id': 1,
                    'type_name': 'nature'
                }
            ]
        })
        db = Database()
        with db.connection.cursor() as c:
            c.execute("TRUNCATE attraction_type CASCADE")
            db.connection.commit()

    def test_create_new_user(self):
        """Start with a blank database."""
        # API Call
        response = self.client.post('/api/v1/users', json={
            'username': 'username',
            'password': 'passwooooooord',
            'email': 'email@email.com',
        })
        self.assertEqual(response.status_code, 200)

        db = UserDatabase()
        user = db.get_user_by_name("username")
        self.assertEqual(user.email, "email@email.com")

        with db.connection.cursor() as c:
            c.execute("TRUNCATE users CASCADE")
            db.connection.commit()
