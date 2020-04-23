from dataclasses import dataclass

from database.database import Database


@dataclass
class Trip:
    id: int
    name: str
    user_id: int
    max_trip_days: int
    is_guided: bool
    in_group: bool
    max_price: int

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "max_trip_days": self.max_trip_days,
            "is_guided": self.is_guided,
            "in_group": self.in_group,
            "max_price": self.max_price,
        }


class TripsDatabase(Database):

    def trip_create(self, name, user_id, max_trip_days, is_guided, in_group, max_price):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO trips (name, user_id, max_trip_days, is_guided, in_group, max_price) ' \
                  'VALUES (%s, %s, %s, %s, %s, %s) RETURNING id'
            cursor.execute(sql, (name, user_id, max_trip_days, is_guided, in_group, max_price))
            self.connection.commit()
            id_of_new_trip = cursor.fetchone()[0]
            return Trip(id=id_of_new_trip, name=name, user_id=user_id, max_trip_days=max_trip_days, is_guided=is_guided,
                        in_group=in_group, max_price=max_price)

    def trip_info(self, user_id, trip_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT  name, max_trip_days, is_guided, in_group, max_price FROM trips WHERE user_id = %s ' \
                  'AND id = %s'
            cursor.execute(sql, (user_id, trip_id))
            result = cursor.fetchone()
            if result is not None:
                return Trip(id=trip_id, name=result[0], user_id=user_id, max_trip_days=result[1], is_guided=result[2],
                            in_group=result[3], max_price=result[4])

    def update_trip(self, trip_id, user_id, changed_fields):
        with self.connection.cursor() as cursor:
            # creates a list with the attributes which  should be updated
            fields = [f"{key} = %s" for key in changed_fields.keys()]
            sql = f"UPDATE trips SET {','.join(fields)} WHERE user_id = %s AND id = %s "
            # unwraps the values from the changed_fields dictionary directly in the tuple
            cursor.execute(sql, (*changed_fields.values(), user_id, trip_id))
            self.connection.commit()
            count_updated_trip = cursor.rowcount
            return count_updated_trip == 1

    def trip_delete(self, user_id, trip_id):
        with self.connection.cursor() as cursor:
            sql = 'DELETE from trips WHERE user_id = %s AND id = %s'
            cursor.execute(sql, (user_id, trip_id))
            self.connection.commit()
            count_deleted_trip = cursor.rowcount
            return count_deleted_trip == 1

    def trips_list(self, user_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT id, name, user_id, max_trip_days, is_guided, in_group, max_price FROM trips ' \
                  'WHERE user_id = %s'
            cursor.execute(sql, (user_id,))
            results = cursor.fetchall()
            return [Trip(id=result[0], name=result[1], user_id=user_id, max_trip_days=result[3], is_guided=result[4],
                         in_group=result[5], max_price=result[6]) for result in results]


