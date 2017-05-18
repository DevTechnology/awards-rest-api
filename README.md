# AWARDS-REST-API 

## PROJECT DESCRIPTION

This is a RESTful set of Web Service API's meant to facilitate the creation of a generic Corporate Awards System.  Work on these API's is on-going.
Currently these API's facilitate User Authentication, Authorization through Role Assignments, and Award Nomination.  The API's are written in nodejs
and documented using Swagger.  The back-end data store is PostreSQL.

## LICENSE

This project is made freely available under the terms of the [MIT License](LICENSE).

## SETUP

### PostgreSQL Database Setup

* As Postgres super user, run the CreateDB.sql script in the setup directory.

		user@ubuntu:~$ psql <CreateDB.sql

* Assumbing a Linux Shell, set the PGUSER and PGPASSWD environment variables in the command shell window nodemon will be run:

		user@ubuntu:~$ export PGUSER=awards
		user@ubuntu:~$ export PGPASSWORD=awards

### Development Setup

		user@ubuntu:~$ cd awards-rest-api 
		user@ubuntu:~$ npm update 
		user@ubuntu:~$ cd api

Edit the config.js file to contain the host IP address of your host environment.  This is not currently set to localhost or 127.0.01
because most development is being done in a local VM.

		user@ubuntu:~$ npm update 
		user@ubuntu:~$ npm test 

After tests are run, code coverage reports are generated.  If all tests pass, you should be ok to start the server.

### Running In Development Mode

To run in development mode, you can use nodemon to watch for code changes and automatically re-start your server when code changes are detected:

		user@ubuntu:~$ cd api 
		user@ubuntu:~$ nodemon app.js 
		
### Swagger API Documentation

Swagger API Documentation is available at http://[your_server]:8080/api-docs. 

 
