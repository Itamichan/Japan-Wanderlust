
# testing if the database classes are correctly executed
from database.attractions_database import AttractionsDatabase
from database.users_database import UserDatabase
from database.trips_database import TripsDatabase

if __name__ == '__main__':
    db_instance = UserDatabase()
    trips_inst = TripsDatabase()
    trip_create = TripsDatabase()
    trip_delete = TripsDatabase()
    attraction_list = AttractionsDatabase()
    trip_attraction_match = AttractionsDatabase()
    get_attr = AttractionsDatabase()

    # create_user = db_instance.create_user('cristina223', 'cristina@gmail.com', 'testtest')
    user = db_instance.get_user_by_name('cristina23')
    # print(trip_create.trip_create('name2', user.id, 20, 'true', 'true', 500))
    print(trips_inst.trips_list(user.id))
    # print(attraction_list.get_attractions_from_trip(1, 1))
    # print(trip_attraction_match.add_attraction_to_trip(2, 1))
    print(trips_inst.update_trip(3, 1, {"name": "changed"}))
    print(get_attr.get_attractions("te", None, None, None))
    print(get_attr.get_type(1))
    print(get_attr.get_attractions_from_type(1, 1))
    # print(trip_delete.trip_delete(1, 1))

    db_instance.close_connection()
    trips_inst.close_connection()
    trip_create.close_connection()
    trip_delete.close_connection()
    attraction_list.close_connection()