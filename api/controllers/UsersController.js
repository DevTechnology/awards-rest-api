var database = require('../database/db');
var promise = require('bluebird');
var password = require('../utils/passwords');
var User = require('../models/User');

module.exports = {
	getAllUsers: getAllUsers,
	getUser: getUser,
	createUser: createUser
};

var db = database.getDB();

function getAllUsers(req, res, next) {
	db.any('select * from users')
		.then(function(data) {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'All Users Retrieved'
				});
		})
		.catch(function(err) {
			return next(err);
		});
}

function getUser(req, res, next) {
	var userID = parseInt(req.params.id);
	db.one('select * from users where id = $1', userID)
		.then(function(data) {
			res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved user'
				});
		})
		.catch(function(err) {
			return next(err);
		});
}

function createUser(req, res, next) {
	console.log("INCOMING REQUEST >> " + JSON.stringify(req.body));
	var user = new User();
	user.first_name = req.body.first_name;
	user.last_name = req.body.last_name;
	user.nick_name = req.body.nick_name;
	user.avatar = req.body.avatar;
	user.company = req.body.company;
	user.phone = req.body.phone;
	user.title = req.body.title;
	user.email = req.body.email;
	user.password = req.body.password;
	user.role = req.body.role;

	user.save(function(err, success) {
		if (err) return next(err);
		res.status(200).json({
			status: 'success',
			data: "User " + user.first_name + " " + user.last_name +  " created!",
			message: 'User Created'
		});
	});
}
