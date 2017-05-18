var request = require('supertest');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	beforeEach(function() {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('Get all users from /api/users', function testSlash(done) {
		request(server).get('/api/users').send().expect("Content-type",/json/).expect(200, done);
	});

});
