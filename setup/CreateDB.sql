DROP DATABASE IF EXISTS devtech_awards;

create database devtech_awards;

\c devtech_awards;

create table Users (
	ID SERIAL PRIMARY KEY,
	first_name VARCHAR,
	last_name VARCHAR,
	nick_name VARCHAR,
	avatar VARCHAR,
	company VARCHAR,
	phone VARCHAR,
	title VARCHAR,
	manager_name VARCHAR,
	email VARCHAR,
	password VARCHAR,
	role VARCHAR
);

DROP USER IF EXISTS awards;
CREATE USER awards WITH PASSWORD 'awards';
grant all privileges on database devtech_awards to awards;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO awards;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO awards;
