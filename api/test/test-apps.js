var request = require('supertest');

describe('loading express', function() {
	var server;
	beforeEach(function() {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
	});

	afterEach(function(done) {
		server.close(done);
	});

	it('responds to /resources/img/James.jpg', function testSlash(done) {
		request(server).get('/resources/img/James.jpg').expect(200, done);
	});

	it('404 non existing routes', function testPath(done) {
		request(server).get('/kauai/outrigger').expect(404, done);
	});
});
