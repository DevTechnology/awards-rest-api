var request = require('supertest');
var Award = require('../models/Award');
var User = require('../models/User');
var assert = require('chai').assert;
var database = require('../database/db');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('Make an Award and persist it', function() {
	
	var db = database.getDB();

	beforeEach(function(done) {
		console.log("Pre-test foo");
		done();
	});

	afterEach(function(done) {
		console.log("Post test foo");
		// Delete test data
		db.none("DELETE FROM awards").then(function(err, success) {
			if (err)
				console.log("Delete Error: " + JSON.stringify(err));
			done();	
		});
	});

	it('Saved award should exist in database', function testPersistAward(done) {
		var award = new Award();
		var nominator = new User();
		nominator.email = "pt@test.com";

		nominator.findUserByEmail(function(err, user) {
			if (err) {
				console.log("Failed to find User: " + JSON.stringify(err));
				assert.fail(JSON.stringify(err), 'success');
			}

			// for this test, make the recipient id, and the nominator id the same.
			award.userid = user.id;
			award.nominatorid = user.id;
			award.rating = 5;
			award.comment = "Wonderful job saving the project from impending doom.";
			award.disposition = "pending review";
			award.nominatedate = `now()`;
			award.save(function(err, data) {
				if (err) {
					console.log("Failed to save award: " + JSON.stringify(err));
					assert.fail(err, 'success');
				}
				assert.isTrue(data === 'success');
				done();
			});
		});
	});

});
