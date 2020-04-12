import os
import uuid
from functools import wraps
from unittest.case import TestCase

from database.database import Database
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
        self.test_db_name = f"{uuid.uuid4().hex}.db"
        self.based_dir = os.getcwd().split('Japan-Wanderlust')[0] + 'Japan-Wanderlust'

    def setUp(self) -> None:
        application.config['TESTING'] = True
        application.config['DB_NAME'] = self.test_db_name
        os.chdir(self.based_dir)

        self.client = application.test_client()

        with application.app_context():
            db = Database()

            sql_dir_name = "./src/sql"
            sql_files = os.listdir("./src/sql")

            for sql_file in sql_files:
                join_file_path = os.path.join(sql_dir_name, sql_file)

                with open(join_file_path, "r") as file:
                    sql = file.read()

                statements = sql.split(';')
                statements = [e for e in statements if len(e) > 5]

                for statement in statements:
                    with db.connection.cursor() as cursor:
                        cursor.execute(statement + ";")
                        db.connection.commit()

            db.close_connection()

    def tearDown(self) -> None:
        os.remove(os.path.join(os.path.curdir, self.test_db_name))
