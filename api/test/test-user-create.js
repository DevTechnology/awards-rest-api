var request = require('supertest');
var database = require('../database/db');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	var db = database.getDB();
	beforeEach(function(done) {
		db.none("DELETE FROM users").then(function() {
			delete require.cache[require.resolve('../app')];
			server = require('../app');
			done();
		});	
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('POST new user to /api/user', function testSlash(done) {
		var newUser = {
	    		"employeeId": "001",
	    		"first_name": "James",
	   		"last_name": "Caple",
	    		"nick_name": "Big Jim",
	   		"title": "Chief Visioneer",
	    		"phone": "(703) 555-5555",
	   		"company": "Dev Technology",
	    		"manager_name": "Michelle Scheurman",
	   		"email": "james.caple@devtechnology.com",
	    		"role": "employee",
	   		"password": "password",
	   		"avatar": "/resources/img/James.jpg"
		};

		request(server).post('/api/user').send(newUser).expect("Content-type",/json/).expect(200, done);
	});

});
