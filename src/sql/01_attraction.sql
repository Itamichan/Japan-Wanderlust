CREATE TABLE attraction_type (
	id serial not null
		constraint attraction_type_pkey
			primary key,
	name text unique not null
);

CREATE TABLE cities(
	id serial not null
		constraint cities_pkey
			primary key,
	name text unique not null
);

CREATE TABLE attractions (
	id serial not null
		constraint attractions_pkey
			primary key,
	name text not null,
	description text not null,
	price integer, --price in YEN
	web_link text,
	picture_url text not null,
	city_id integer REFERENCES cities (id)
);

CREATE TABLE attraction_type_match (
    id serial not null
		constraint attraction_type_match_pkey
			primary key,
	attraction_type_id integer REFERENCES attraction_type (id),
	attraction_id integer REFERENCES attractions (id)
);

CREATE TABLE trip_list_attraction_match (
    id serial not null
		constraint trip_list_attraction_match_pkey
			primary key,
	trip_list_id integer REFERENCES trip_list (id),
	attraction_id integer REFERENCES attractions (id)
);

