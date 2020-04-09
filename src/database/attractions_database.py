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

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "attraction_name": self.attraction_name.capitalize(),
            "description": self.description,
            "price": self.price,
            "web_link": self.web_link,
            "picture_url": self.picture_url,
            "city_id": self.city_id,
        }


class AttractionsDatabase(Database):

    def add_attraction_to_trip(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            sql = 'INSERT INTO trip_list_attraction_match (trip_list_id, attraction_id) VALUES (%s, %s) RETURNING id'
            cursor.execute(sql, (trip_list_id, attraction_id))
            self.connection.commit()

    def get_attractions_from_trip(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            sql = 'SELECT attr.* from trip_list_attraction_match tlm JOIN attractions attr ON ' \
                  'tlm.attraction_id = attr.id WHERE tlm.attraction_id = %s AND tlm.trip_list_id = %s'
            cursor.execute(sql, (attraction_id, trip_list_id))
            results = cursor.fetchall()
            return [Attraction(id=result[0], attraction_name=result[1], description=result[2],
                               price=result[3], web_link=result[4], picture_url=result[5],
                               city_id=result[6])
                    for result in results]

    def remove_attraction_from_trip(self, trip_list_id, attraction_id):
        with self.connection.cursor() as cursor:
            sql = 'DELETE from trip_list_attraction_match WHERE trip_list_id = %s AND attraction_id = %s'
            cursor.execute(sql, (trip_list_id, attraction_id))
            self.connection.commit()
            count_deleted_attraction = cursor.rowcount
            return count_deleted_attraction == 1

    def get_attractions(self, text, attraction_type_id, city_id, max_price):
        with self.connection.cursor() as cursor:
            values = []
            sql = 'select  * from attractions '
            clause = "WHERE"

            if attraction_type_id is not None:
                sql += f'JOIN attraction_type_match atm ON attractions.id = atm.attraction_id {clause} attraction_type_id = %s '
                clause = "AND"
                values.append(attraction_type_id)

            if text is not None:
                sql += f"{clause} name ILIKE %s "
                clause = "AND"
                ilike_syntax = f"%{text}%"
                values.append(ilike_syntax)

            if city_id is not None:
                sql += f'{clause} city_id = %s '
                clause = "AND"
                values.append(city_id)

            if max_price is not None:
                sql += f'{clause} price < %s'
                values.append(max_price)

            cursor.execute(sql, values)
            results = cursor.fetchall()
            return [Attraction(id=result[0], attraction_name=result[1], description=result[2],
                               price=result[3], web_link=result[4], picture_url=result[5],
                               city_id=result[6])
                    for result in results]

    def get_attraction_type(self, type_id):
        with self.connection.cursor() as cursor:
            sql = "SELECT name from attraction_type WHERE id = %s "
            cursor.execute(sql, (type_id,))
            result = cursor.fetchone()
            if result is not None:
                return result[0]


