var request = require('supertest');
var database = require('../database/db');
var User = require('../models/User');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	var db = database.getDB();
	var user = {};
	var xapitoken;

	beforeEach(function(done) {
		db.any('select * from users').then(function(data) {
			user = data[0];	
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

	afterEach(function(done) {
		server.close(done);
	});

	it('Get user from /api/user', function testSlash(done) {
		request(server).get('/api/user/'+user.id).set('x-access-token', xapitoken).send().expect("Content-type",/json/).expect(200, done);
	});

});
