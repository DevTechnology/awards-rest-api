var request = require('supertest');
var database = require('../database/db');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing user rest api', function() {
	var server;
	var db = database.getDB();
	var user = {};
	beforeEach(function(done) {
		db.any('select * from users').then(function(data) {
			user = data[0];	
			delete require.cache[require.resolve('../app')];
			server = require('../app');
			done();
		});
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('Get user from /api/user', function testSlash(done) {
		request(server).get('/api/user/'+user.id).send().expect("Content-type",/json/).expect(200, done);
	});

});
