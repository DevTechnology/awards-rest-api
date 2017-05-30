var request = require('supertest');
var database = require('../database/db');
var Award = require('../models/Award');
var User = require('../models/User');
var assert = require('chai').assert;

process.env.PGUSER='awards';
process.env.PGPASSWORD='awards';

describe('testing award rest api', function() {
	var server;
	var db = database.getDB();
	var xapitoken;
	var awardRecipientID;
	var awardGiverer;

	beforeEach(function(done) {
		delete require.cache[require.resolve('../app')];
		server = require('../app');
	
		var creds = { "email": "pt@test.com", "password": "automated_pipeline" };
		request(server).post('/api/authenticate').send(creds).expect(200).end(function(err, res) {
			console.log("RESPONSE: " + JSON.stringify(res));
			var jsonResp = JSON.parse(res.text);
			xapitoken = jsonResp.token;
			console.log("XAPITOKEN > " + xapitoken);
			var user1 = new User();
			user1.email = "pt@test.com";
			user1.findUserByEmail(function(err, data) {
				if (err) {
					console.log("Error: " + JSON.stringify(err));
					assert.fail(err, 'success');
				}
				awardGiverer = data;
				var user2 = new User();
				user2.email = "kraken@yahoo.com";
				user2.findUserByEmail(function(err, data) {
					if (err) assert.fail(err, 'success');
					awardRecipientID = data;
					done();
				});
			});
		});

	});

	afterEach(function(done) {
		server.close();
		db.none("DELETE FROM awards").then(function(err, success) {
			if (err)
				console.log("Delete Error: " + JSON.stringify(err));
			done();	
		});

	});

	it('POST new user to /api/award', function testSlash(done) {
		var newAward = {
			"userid" : awardRecipientID.id,
			"nominatorid" : awardGiverer.id, 
			"rating" : 4,
			"comment" : "Thanks for a truly inspirational sales speech at the Company All Hands",
			"nominatedate" : `now()`,
			"disposition": "nomination"
		};
		request(server).post('/api/award').set('x-access-token', xapitoken).send(newAward).expect("Content-type",/json/).expect(200, done);
	});

});
