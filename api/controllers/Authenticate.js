var jwt = require('jsonwebtoken');
var config = require('../config');
var database = require('../database/db');
var User = require('../models/User');

// This Controller authenticates a user based on provided email and password.
// If authenticated, a JSON Web Token is issued to the client.

var authenticateUserCredentials = function(req, res, next) {

	// Incoming credentials
	var user = new User();
	user.email = req.body.email;
	user.password = req.body.password;

	user.findUserByEmail(function(err, foundUser) {
		if (err) throw err;

		if (!user) { 
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			foundUser.comparePassword(user.password, function(err, isMatch) {
				if (err) throw err;

				if (isMatch) {
					// if user is found and password is right
					// create a token
					var token = jwt.sign(foundUser, config.secret, {
						expiresIn: 28800 
					});

					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Your token is valid for 8 hours',
						token: token
					});
				} else {
					res.json({ success: false, message: 'Authentication failed.' });
				}
			});
		}
	});

};

module.exports = authenticateUserCredentials;
