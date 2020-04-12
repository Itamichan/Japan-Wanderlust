import os
import sys
import unittest
import xmlrunner
from database.database import Database


def additional_tests():
    setup_file = sys.modules['__main__'].__file__
    setup_dir = os.path.abspath(os.path.dirname(setup_file))
    return unittest.defaultTestLoader.discover(setup_dir, pattern='test*.py')


def create_tables():
    db = Database()
    sql_dir_name = "./src/sql"
    sql_files = os.listdir("./src/sql")
    for sql_file in sorted(sql_files):
        join_file_path = os.path.join(sql_dir_name, sql_file)
        with open(join_file_path, "r") as file:
            sql = file.read()
            print(sql)
            print(os.curdir)
            with db.connection.cursor() as cursor:
                cursor.execute(sql)
                db.connection.commit()


if __name__ == '__main__':
    os.environ.setdefault("DB_HOST", "localhost")
    os.environ.setdefault("DB_USER", "test_user")
    os.environ.setdefault("DB_PASSWORD", "test_password")
    os.environ.setdefault("DB_NAME", "unittest_backend")

    create_tables()
    testsuit = additional_tests()
    result = xmlrunner.XMLTestRunner(output='test-reports').run(testsuit)
    if not result.wasSuccessful():
        exit(1)
    exit(0)
