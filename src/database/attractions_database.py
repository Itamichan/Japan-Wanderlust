from dataclasses import dataclass

from database.database import Database


@dataclass
class Attraction:
    id: int
    attraction_name: str
    description: str
    price: int
    web_link: str
    picture_url: str
    city_id: int


class AttractionsDatabase(Database):

    def add_attraction_to_trip(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            # check that user is authorized -in the view
            sql = 'INSERT INTO trip_list_attraction_match (trip_list_id, attraction_id) VALUES (%s, %s) RETURNING id'
            cursor.execute(sql, (trip_list_id, attraction_id))
            self.connection.commit()
            # can raise an integrity error
            # the combination of trip_list_id, attraction_id should be unique
            id_of_new_attraction = cursor.fetchone()[0]
            return id_of_new_attraction

    def attractions_in_trip(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            # check that this user is authorized to get the attraction list-in the view
            sql = 'SELECT attr.* from trip_list_attraction_match tlm JOIN attractions attr ON ' \
                  'tlm.attraction_id = attr.id WHERE tlm.attraction_id = %s AND tlm.trip_list_id = %s'
            cursor.execute(sql, (attraction_id, trip_list_id))
            results = cursor.fetchall()
            return [Attraction(id=result[0], attraction_name=result[1], description=result[2],
                               price=result[3], web_link=result[4], picture_url=result[5],
                               city_id=result[6])
                    for result in results]

    def remove_attraction_from_trip(self, trip_list_id, trip_attraction_match_id):
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
