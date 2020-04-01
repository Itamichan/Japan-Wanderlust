CREATE TABLE attraction_type (
	id serial not null
		constraint attraction_type_pkey
			primary key,
	name text
);

CREATE TABLE cities(
	id serial not null
		constraint cities_pkey
			primary key,
	name text
);

CREATE TABLE attractions (
	id serial not null
		constraint attractions_pkey
			primary key,
	name text,
	opening_time text,
	price money,
	web_link text,
	picture_link text,
	city_id INTEGER REFERENCES cities (id)
);

CREATE TABLE attraction_type_match (
    id serial not null
		constraint attraction_type_match_pkey
			primary key,
	attraction_type_id INTEGER REFERENCES attraction_type (id),
	attraction_id INTEGER REFERENCES attractions (id)
);

CREATE TABLE trip_list_attraction_match (
    id serial not null
		constraint trip_list_attraction_match_pkey
			primary key,
	trip_list_id INTEGER REFERENCES trip_list (id),
	attraction_id INTEGER REFERENCES attractions (id)
);

