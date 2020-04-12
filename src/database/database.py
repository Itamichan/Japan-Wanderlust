import os
import sqlite3

import psycopg2
from flask import current_app
from flask import g


class ConnectionWrapper:

    def __init__(self, connection):
        self.connection = connection

    def cursor(self):
        if current_app.config['TESTING']:
            return SafeCursor(self.connection)
        else:
            return self.connection

    def commit(self):
        self.connection.commit()

class SafeCursor:
    def __init__(self, connection):
        self.con = connection

    def __enter__(self):
        self.cursor = self.con.cursor()
        return self.cursor

    def __exit__(self, typ, value, traceback):
        self.cursor.close()


class Database:

    def __init__(self):
        if 'db' not in g:
            if current_app.config['TESTING']:
                g.db = sqlite3.connect(current_app.config['DB_NAME'])
            else:
                DB_HOST = os.environ.get('DB_HOST')
                DB_USER = os.environ.get('DB_USER')
                DB_PASSWORD = os.environ.get('DB_PASSWORD')
                DB_NAME = os.environ.get('DB_NAME')

                g.db = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)
            self.connection = ConnectionWrapper(g.db)
        else:
            self.connection = ConnectionWrapper(g.db)

    def close_connection(self):
        db = g.pop('db', None)

        if db is not None:
            db.close()
