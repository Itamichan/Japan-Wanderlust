
CREATE TABLE users (
	id serial not null
		constraint users_pkey
			primary key,
	username text unique,
	password text not null,
	salt text not null,
	email text not null
);

CREATE TABLE trip_list (
	id serial not null
		constraint trip_list_pkey
			primary key,
	name text,
	user_id integer REFERENCES users (id),
	max_trip_days integer not null,
	is_guided boolean not null,
	in_group boolean not null,
	max_price integer not null
);