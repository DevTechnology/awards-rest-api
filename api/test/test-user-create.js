var request = require('supertest');
var database = require('../database/db');
var User = require('../models/User');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	var db = database.getDB();
	var xapitoken;

	beforeEach(function(done) {
		db.none("DELETE FROM users").then(function() {
			// create test account
			var user = new User();
			console.log("Create user in before hook");
			user.first_name = "Test";
			console.log("User First Name " + user.first_name);
			user.last_name = "Test";
			user.nick_name = "Test";
			user.email = "pt@test.com";
			user.password = "automated_pipeline";
			user.save(function(err, success) {
				if (err) throw err;

				delete require.cache[require.resolve('../app')];
				server = require('../app');

				var creds = { "email": user.email, "password": "automated_pipeline" };
				request(server).post('/api/authenticate').send(creds).expect(200).end(function(err, res) {
					console.log("RESPONSE: " + JSON.stringify(res));
					var jsonResp = JSON.parse(res.text);
					xapitoken = jsonResp.token;
					console.log("XAPITOKEN > " + xapitoken);
					done();
				});

			});
		});	
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('POST new user to /api/user', function testSlash(done) {
		var newUser = {
	    		"employeeId": "001",
	    		"first_name": "James",
	   		"last_name": "Kraken",
	    		"nick_name": "Big Jim",
	   		"title": "Chief Visioneer",
	    		"phone": "(703) 555-5555",
	   		"company": "Dev Technology",
	    		"manager_name": "James Gosling",
	   		"email": "kraken@yahoo.com",
	    		"role": "employee",
	   		"password": "password",
	   		"avatar": "/resources/img/James.jpg"
		};
		request(server).post('/api/user').set('x-access-token', xapitoken).send(newUser).expect("Content-type",/json/).expect(200, done);
	});

});
