import os

import psycopg2

os.environ['DB_HOST'] = 'ec2-54-217-204-34.eu-west-1.compute.amazonaws.com'
os.environ['DB_USER'] = "ykrlolvefueqdw"
os.environ['DB_PASSWORD'] = "26ed87bbb194f0f49ef2d7439421d23fdee369c50bf8e50be8b24e96c4245a19"
os.environ['DB_NAME'] = "d5o952p00bhsjo"

DB_HOST = os.environ.get('DB_HOST')
DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_NAME = os.environ.get('DB_NAME')

conn = psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASSWORD)

sql_dir_name = "./src/sql"
sql_files = os.listdir("./src/sql")

for sql_file in sql_files:
    join_file_path = os.path.join(sql_dir_name, sql_file)

    with open(join_file_path, "r") as file:
        sql = file.read()
        print(sql)

    with conn.cursor() as cursor:
        cursor.execute(sql)
        conn.commit()

conn.close()
