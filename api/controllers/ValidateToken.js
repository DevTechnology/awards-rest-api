var jwt = require('jsonwebtoken');
var config = require('../config.js');
var database = require('../database/db');
var User = require('../models/User');

module.exports = function(req, res, next) {

  // Retrieve JWT, decode it, grab encoded password and compare
  // with that of persisted User with comparable email.

  var token = req.headers['x-access-token'];
 
  if (token) {
    try {
	console.log("Token Before Decode: " + token);
	var decoded = "";
	try {
      		decoded = jwt.verify(token, config.secret);
		console.log("Token Date: " + decoded.exp);
	} catch (e) {
		res.status(400);
		res.json({
		  "status": 400,
		  "message": "Invalid Token"
		});
		return;
	}
	
	console.log("Token After Decode: " + JSON.stringify(decoded)); 

	var decodedUserEmail = decoded.email;

	console.log("Looking for user with email >>> " + decodedUserEmail);

	var user = new User();
	user.email = decodedUserEmail;

	user.findUserByEmail(function(err, _user) {
		if (err) {
			res.status(500);
			res.json({
				"status": 500,
				"message": "An unexpected error occurred: " + err
			});
		} else {
			if (_user.password === decoded.password) {
				next();
			} else {
				res.status(401);
				res.json({
					"status":401,
					"message": "Invalid Token"
				});
				return;	
			}
		}
	});

    } catch (err) {
	console.log("ERROR: " + err);
      	res.status(500);
      	res.json({
        	"status": 500,
        	"message": "Oops something went wrong"
        });
    }
  } else {
  	res.status(401);
    	res.json({
      		"status": 401,
      		"message": "Invalid Token or Key"
    	});
    	return;
  }
};
