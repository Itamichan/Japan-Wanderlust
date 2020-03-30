create table users
(
	id serial not null
		constraint users_pkey
			primary key,
	username text,
	firstname text,
	lastname text,
	password text,
	email text
);
