var request = require('supertest');
var User = require('../models/User');
var assert = require('chai').assert;

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('Find User and test password', function() {
	var test_user;
	beforeEach(function(done) {
		User.findUserByEmail('james.caple@devtechnology.com', function(err, user) {
			if (err) throw err;
			test_user = user;
			console.log("Test Found User ==> " + test_user.email);
			done();
		});
	});

	it('passwords should match', function testPasswords(done) {
		var incomingPassword = "password";
		console.log("User Email:" + test_user.email);
		test_user.comparePassword(incomingPassword, function(err, isMatch) {
			if (err) throw err;
			console.log("Do Passwords Match? " + isMatch);
			assert.isTrue(isMatch);
			done();
		});
	});

	it('ensure data elements', function testDataElements() {
		assert.equal(test_user.email, 'james.caple@devtechnology.com');
		assert.equal(test_user.first_name, 'James');
		assert.equal(test_user.last_name, 'Caple');
		assert.equal(test_user.avatar, '/resources/img/James.jpg');
		assert.equal(test_user.phone, '(703) 555-5555');
		assert.equal(test_user.title, 'Chief Visioneer');
	});

});
