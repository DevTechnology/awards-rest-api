var request = require('supertest');
var Award = require('../models/Award');
var assert = require('chai').assert;
var database = require('../database/db');

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('Make an Award and persist it', function() {
	
	var db = database.getDB();

	beforeEach(function(done) {

	});

	afterEach(function(done) {
		// Delete test data
		db.none("DELETE FROM awards").then(function(err, success) {
			done();	
		});
	});

	it('Saved award should exist in database', function testPasswords(done) {
		
	});

});
