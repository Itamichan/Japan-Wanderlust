import hashlib
import os
from collections import namedtuple
import base64
from dataclasses import dataclass

import psycopg2

DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')

conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)

@dataclass
class User:
    id: int
    username: str
    email: str
    password: str
    salt: str

    def user_info(self) -> dict:
        return {
            "username": self.username,
            "email": self.email
        }


class Database:
    def __init__(self):
        self.connection = conn

    def close_connection(self):
        self.connection.close()

    def create_user(self, username, email, password):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO users (username, email, password, salt) VALUES (%s, %s, %s, %s, %s, %s)'

            # hashing the user's password, adding salt and iterations
            salt = os.urandom(32)
            hash_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000).hex()

            cursor.execute(sql, (username, email, hash_password, salt.hex()))
            self.connection.commit()

    def get_user_by_name(self, username):
        with self.connection.cursor() as cursor:
            sql = 'SELECT id, username, email, password, salt FROM users WHERE username = %s'
            cursor.execute(sql, (username,))
            result = cursor.fetchone()
            if result is not None:
                return User(id=result[0], username=username, email=result[2], password=result[3], salt=result[4])

    def verify_user(self, username, password):
        """ This function takes username and password as parametres and checks if a user with such a password exists in the database"""
        user = self.get_user_by_name(username)
        if user:
            salt = bytearray.fromhex(user.salt)
            hash_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000).hex()
            if user.password == hash_password:
                return user

    def get_user_by_id(self, user_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT username, email, password, salt FROM users WHERE id = %s'
            cursor.execute(sql, user_id)
            result = cursor.fetchone()
            if result:
                return User(id=user_id, username=result[0], email=result[1], password=result[2], salt=result[3])


# testing if the class functions are correctly executed
if __name__ == '__main__':
    db_instance = Database()

    db_instance.create_user('testtest4', 'test@gmail.com', 'testtest')
    print(db_instance.verify_user('testtest4', 'testtest'))
    db_instance.close_connection()
