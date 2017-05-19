var request = require('supertest');
var assert = require('chai').assert;

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user authentication', function() {
	var server;
	beforeEach(function(done) {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
		done();
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('returns authentication token', function test(done) {
		var auth = {
	   		"email": "james.caple@devtechnology.com",
	   		"password": "password",
		};

		request(server).post('/api/authenticate').send(auth)
			.expect('Content-Type', 'application/json')
			.end(function(err, result) {
				assert.equal(result.body.success, true);
				assert.equal(result.body.message, "Your token is valid for 8 hours");
				done();
			});
	});

});
