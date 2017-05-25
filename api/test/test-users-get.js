var request = require('supertest');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	var xapitoken;
	
	beforeEach(function(done) {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
		var creds = { "email": "pt@test.com", "password": "automated_pipeline" };
		request(server).post('/api/authenticate').send(creds).expect(200).end(function(err, res) {
			console.log("RESPONSE: " + JSON.stringify(res));
			var jsonResp = JSON.parse(res.text);
			xapitoken = jsonResp.token;
			console.log("XAPITOKEN > " + xapitoken);
			done();
		});
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('Get all users from /api/users', function testSlash(done) {
		request(server).get('/api/users').set('x-access-token', xapitoken).send().expect("Content-type",/json/).expect(200, done);
	});

});
