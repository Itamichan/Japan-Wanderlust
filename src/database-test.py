
# testing if the class functions are correctly executed
from database.users_database import UserDatabase
from database.trips_database import TripsDatabase

if __name__ == '__main__':
    db_instance = UserDatabase()
    trips_inst = TripsDatabase()

    user = db_instance.get_user_by_name('testtest4')
    print(trips_inst.trip_list(user.id))

    db_instance.close_connection()
    trips_inst.close_connection()