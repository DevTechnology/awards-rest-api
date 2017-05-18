
var password = require('../utils/passwords.js');
var assert = require('chai').assert;
var password = require('../utils/passwords.js');
var passwd = 'defcon16';

describe("Encrypt Password", function() {
	var encryptedPasswd = "";
	var passwdsMatch = false;
	var err1, err2

	beforeEach(function(done) {
		password.cryptPassword(passwd, function(err, hash, salt) {
			console.log("Encrypted: " + hash);
			encryptedPasswd = hash;
			err1 = err;
			password.comparePassword(passwd, encryptedPasswd, function(err, isMatch) {
				err2 = err;
				passwdsMatch = isMatch;
				done();	
			});
		});
	});

	it('should be encrypted', function() {
		assert.ifError(err1);
		assert.notEqual(encryptedPasswd, passwd);
	});

	it('should match original when decrypted', function() {
		assert.ifError(err2);
		assert.isTrue(passwdsMatch);
			
	});
});
