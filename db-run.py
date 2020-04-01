import os

import psycopg2

DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')

conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)

sql_dir_name = "./src/sql"
sql_files = os.listdir("./src/sql")

for sql_file in sql_files:
    print(sql_file)
    join_file_path = os.path.join(sql_dir_name, sql_file)

    with open(join_file_path, "r") as file:
        sql = file.read()

    with conn.cursor() as cursor:
        cursor.execute(sql)
        conn.commit()

conn.close()
