
# testing if the class functions are correctly executed
from database.users_database import UserDatabase
from database.trips_database import TripsDatabase

if __name__ == '__main__':
    db_instance = UserDatabase()
    trips_inst = TripsDatabase()
    trip_create = TripsDatabase()
    trip_delete = TripsDatabase()

    # create_user = db_instance.create_user('cristina23', 'cristina@gmail.com', 'testtest')
    user = db_instance.get_user_by_name('cristina23')
    # print(trip_create.trip_create('name', user.id, 20, 'true', 'true', 500))
    print(trips_inst.trip_list(user.id))
    print(trip_delete.trip_delete(1, 1))

    db_instance.close_connection()
    trips_inst.close_connection()
    trip_create.close_connection()
    trip_delete.close_connection()