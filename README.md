# README

## DESCRIPTION

This is a RESTful set of Web Service API's meant to facilitate the creation of a generic Corporate Awards System.  Work on these API's is on-going.
Currently the API's facilitate User Authentication, Authorization through Role Assignments, and Award Nomination.  The API's are written in nodejs
and documented using Swagger.  The back-end data store is PostreSQL.

## LICENSE

This project is made freely available under the terms of the MIT License.

## SETUP

### PSQL Database Setup

* As Postgres super user, run the CreateDB.sql script in the setup directory.

		user@ubuntu:~$ sql <CreateDB.sql

* Assumbing a Linux Shell, set the PGUSER and PGPASSWD environment variables in the command shell window nodemon will be run:

		user@ubuntu:~$ export PGUSER=awards
		user@ubuntu:~$ export PGPASSWORD=awards

### Development Setup

		user@ubuntu:~$ cd awards-rest-api 
		user@ubuntu:~$ npm update 
		user@ubuntu:~$ cd api 
		user@ubuntu:~$ npm update 

### Running In Development Mode

To run in development mode, you can use nodemon to watch for code changes and automatically re-start your server when code changes are detected:

		user@ubuntu:~$ cd api 
		user@ubuntu:~$ nodemon app.js 
		
		

 
