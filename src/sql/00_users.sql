
CREATE TABLE users (
	id serial not null
		constraint users_pkey
			primary key,
	username text,
	firstname text,
	lastname text,
	password text,
	email text
);

CREATE TABLE trip_list (
	id serial not null
		constraint trip_list_pkey
			primary key,
			name text,
	user_id integer REFERENCES users (id),
	max_trip_days integer,
	is_guided boolean,
	in_group boolean,
	max_price integer
);