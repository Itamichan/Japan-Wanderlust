import hashlib
import os
from dataclasses import dataclass

from database.database import Database


@dataclass
class Trip:
    id: int
    name: str
    max_trip_days: int
    is_guided: bool
    in_group: bool
    max_price: int

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "max_trip_days": self.max_trip_days,
            "is_guided": self.is_guided,
            "in_group": self.in_group,
            "max_price": self.max_price,
        }


@dataclass
class AttractionItem:
    id: int
    trip_list_id: int
    attraction_id: int


class TripsDatabase(Database):

    def trip_create(self, name, user_id, max_trip_days, is_guided, in_group, max_price):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO trip_list (name, user_id, max_trip_days, is_guided, in_group, max_price) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id'
            cursor.execute(sql, (name, user_id, max_trip_days, is_guided, in_group, max_price))
            self.connection.commit()
            id_of_new_trip = cursor.fetchone()[0]
            return id_of_new_trip

    def trip_info(self, user_id, trip_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT  name, max_trip_days, is_guided, in_group, max_price FROM trip_list WHERE user_id = %s AND id = %s'
            cursor.execute(sql, (user_id, trip_id))
            result = cursor.fetchone()
            if result is not None:
                return Trip(id=trip_id, name=result[1], max_trip_days=result[2], is_guided=result[3],
                            in_group=result[4], max_price=result[5])

    def trips_list(self, user_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT id, name, max_trip_days, is_guided, in_group, max_price FROM trip_list WHERE user_id = %s'
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()
            return [Trip(id=result[0], name=result[1], max_trip_days=result[2], is_guided=result[3], in_group=result[4],
                         max_price=result[5]) for result in results]

    def trip_delete(self, user_id, trip_id):
        with self.connection.cursor() as cursor:
            sql = 'DELETE from trip_list WHERE user_id = %s AND id = %s'
            cursor.execute(sql, (user_id, trip_id))
            self.connection.commit()
            count_deleted_trip = cursor.rowcount
            if count_deleted_trip != 1:
                return "false"
            else:
                return "true"

    def add_attraction(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO trip_list_attraction_match (trip_list_id, attraction_id) VALUES (%s, %s) RETURNING id'
            cursor.execute(sql, (trip_list_id, attraction_id))
            self.connection.commit()
            id_of_new_attraction = cursor.fetchone()[0]
            return id_of_new_attraction

    def attractions_list(self, trip_list_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT id, trip_list_id, attraction_id FROM trip_list_attraction_match WHERE trip_list_id = %s'
            cursor.execute(sql, (trip_list_id,))
            results = cursor.fetchall()
            return [AttractionItem(id=result[0], trip_list_id=trip_list_id, attraction_id=result[2]) for result in results]

    def remove_attraction(self, trip_list_id, trip_attraction_match_id):
        with self.connection.cursor() as cursor:
            sql = 'DELETE from trip_list_attraction_match WHERE trip_list_id = %s AND id = %s'
            cursor.execute(sql, (trip_list_id, trip_attraction_match_id))
            self.connection.commit()
            count_deleted_attraction = cursor.rowcount
            if count_deleted_attraction != 1:
                return "false"
            else:
                return "true"

# get /api/v1/trips/<id>/attractions

# post /api/v1/trips/<id>/attractions/<id>
# delete /api/v1/trips/<id>/attractions/<id>


# todo patch
# patch /api/v1/trips/<id> updates a trip list
