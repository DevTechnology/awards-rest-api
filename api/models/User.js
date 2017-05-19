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
		this.id = data.id;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.nick_name = data.nick_name;
		this.avatar = data.avatar;
		this.company = data.company;
		this.phone = data.phone;
		this.title = data.title;
		this.manager_name = data.manager_name;
		this.email = data.email;
		this.password = data.password;
		this.role = data.role;
		this.comparePassword = comparePassword;
		cb(null, this);
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
