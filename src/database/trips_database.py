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
class AttractionsList:
    tlm_id: int
    trip_list_name: str
    max_trip_days: int
    is_guided: bool
    in_group: bool
    max_price: int
    attraction_name: str
    price: int
    city_id: int


class TripsDatabase(Database):

    def trip_create(self, name, user_id, max_trip_days, is_guided, in_group, max_price):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO trip_list (name, user_id, max_trip_days, is_guided, in_group, max_price) ' \
                  'VALUES (%s, %s, %s, %s, %s, %s) RETURNING id'
            cursor.execute(sql, (name, user_id, max_trip_days, is_guided, in_group, max_price))
            self.connection.commit()
            id_of_new_trip = cursor.fetchone()[0]
            return Trip(id=id_of_new_trip, name=name, max_trip_days=max_trip_days, is_guided=is_guided,
                        in_group=in_group, max_price=max_price)

    def trip_info(self, user_id, trip_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT  name, max_trip_days, is_guided, in_group, max_price FROM trip_list WHERE user_id = %s ' \
                  'AND id = %s'
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
            return count_deleted_trip == 1

    def add_attraction(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            # check that user is authorized -in the view
            sql = 'INSERT INTO trip_list_attraction_match (trip_list_id, attraction_id) VALUES (%s, %s) RETURNING id'
            cursor.execute(sql, (trip_list_id, attraction_id))
            self.connection.commit()
            # can raise an integrity error
            # the combination of trip_list_id, attraction_id should be unique
            id_of_new_attraction = cursor.fetchone()[0]
            return id_of_new_attraction

    def attractions_list(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            # join trip_list and attraction and return a list of attractions
            # check that this user is authorized to get the attraction list-in the view
            sql = 'SELECT tlm.id , tl.*,  a.* from trip_list_attraction_match tlm JOIN attractions a ON ' \
                  'tlm.attraction_id = a.id JOIN trip_list tl ON tlm.trip_list_id = tl.id WHERE tlm.attraction_id = %s ' \
                  'AND tlm.trip_list_id = %s'
            cursor.execute(sql, (attraction_id, trip_list_id))
            results = cursor.fetchall()
            return [AttractionsList(tlm_id=result[0], trip_list_name=result[2], max_trip_days=result[4],
                                    is_guided=result[5], in_group=result[6], max_price=result[7],
                                    attraction_name=result[9], price=result[11], city_id=result[14])
                    for result in results]

    def remove_attraction(self, trip_list_id, trip_attraction_match_id):
        # check that user is authorized-in the view
        with self.connection.cursor() as cursor:
            sql = 'DELETE from trip_list_attraction_match WHERE trip_list_id = %s AND id = %s'
            cursor.execute(sql, (trip_list_id, trip_attraction_match_id))
            self.connection.commit()
            count_deleted_attraction = cursor.rowcount
            return count_deleted_attraction == 1

# get /api/v1/trips/<id>/attractions

# post /api/v1/trips/<id>/attractions/<id>
# delete /api/v1/trips/<id>/attractions/<id>


# todo patch
# patch /api/v1/trips/<id> updates a trip list
