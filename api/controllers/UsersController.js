var database = require('../database/db')
var promise = require('bluebird');
var password = require('../utils/passwords')

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
	var user = req.body;
	password.cryptPassword(user.password, function(err, hash, salt) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		db.none('insert into users(first_name, last_name, nick_name, avatar, company, phone, title, manager_name, email, password, role) ' +
			'values(${first_name}, ${last_name}, ${nick_name}, ${avatar}, ${company}, ${phone}, ${title}, ${manager_name}, ${email}, ${password}, ${role})', user)
			.then(function() {
				res.status(200).json({
					status: 'success',
					data: "User " + user.first_name + " " + user.last_name +  " created!",
					message: 'User Created'
				});
			})
			.catch(function(err) {
				return next(err);
			});
	});
}
