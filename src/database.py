import hashlib
import os
from collections import namedtuple

import psycopg2

DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')

conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)

User = namedtuple('User', 'id username email')


class Database:
    def __init__(self):
        self.connection = conn

    def close_connection(self):
        self.connection.close()

    def create_user(self, username, firstname, lastname, email, password):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO users (username, firstname, lastname, email, password) VALUES (%s, %s, %s, %s, %s)'

            def hash_password(user_password):
                salt = os.urandom(32)
                hashed_password = hashlib.pbkdf2_hmac('sha256', user_password.encode('utf-8'), salt, 100000)
                return hashed_password

            print(hash_password(password))
            cursor.execute(sql, (username, firstname, lastname, email, hash_password(password),))
            self.connection.commit()

    def get_user_by_name(self, username):
        with self.connection.cursor() as cursor:
            sql = 'SELECT id, username, email FROM users WHERE username = %s'
            cursor.execute(sql, (username,))
            result = cursor.fetchone()
            if result is not None:
                return User(id=result[0], username=username, email=result[2])

# testing if the class functions are correctly executed
if __name__ == '__main__':
    db_instance = Database()

    db_instance.create_user('testtest3', 'test', 'test', 'test@gmail.com', 'testtest')
    db_instance.close_connection()