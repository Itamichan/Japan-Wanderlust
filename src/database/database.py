import os

import psycopg2


class Database:
    def __init__(self):
        DB_HOST = os.environ.get('DB_HOST')
        DB_USER = os.environ.get('DB_USER')
        DB_PASSWORD = os.environ.get('DB_PASSWORD')
        DB_NAME = os.environ.get('DB_NAME')

        self.connection =  psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)

    def close_connection(self):
        self.connection.close()