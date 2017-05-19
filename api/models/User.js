var passwords = require('../utils/passwords');
var database = require('../database/db');

var User = {
	id: 0,
	first_name: "", 
	last_name: "",
	nick_name: "",
	avatar: "",
	company: "",
	phone: "",
	title: "",
	manager_name: "",
	email: "",
	password: "",
	role: "",
};

User.findUserByEmail = function(email, cb) {
	var db = database.getDB();
	db.one('SELECT * from users where email=$1', email).then(function(data) {
		data.comparePassword = comparePassword;
		cb(null, data);
	}).catch(function(err) {
		cb(err);
	});
};

function comparePassword(candidatePassword, cb) {
	passwords.comparePassword(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
}

module.exports = User;
