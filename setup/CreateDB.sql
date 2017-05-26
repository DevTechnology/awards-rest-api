revoke all privileges on database devtech_awards from awards;
revoke usage on schema public from awards;
revoke all on all sequences in schema public from awards;
drop user if exists awards;


drop database if exists devtech_awards;

create database devtech_awards;

\c devtech_awards;

create table Users (
	ID SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	nick_name VARCHAR,
	avatar VARCHAR,
	company VARCHAR,
	phone VARCHAR,
	title VARCHAR,
	manager_name VARCHAR,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	role VARCHAR
);

create table Awards (
	userId integer PRIMARY KEY REFERENCES Users(ID),
	nominatorId integer REFERENCES Users(ID) NOT NULL,
	rating integer NOT NULL,
	comment VARCHAR NOT NULL,
	nominatedate TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	nominationupdatedate TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	nominationreviewdate TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	disposition VARCHAR
);

create user awards with password 'awards';
grant all privileges on database devtech_awards to awards;
grant select, insert, update, delete on all tables in schema public TO awards;
grant all privileges on all sequences in schema public to awards;
