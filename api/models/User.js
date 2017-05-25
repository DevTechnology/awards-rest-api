var passwords = require('../utils/passwords');
var database = require('../database/db');

function User() {
	this.id = 0;
	this.first_name=""; 
	this.last_name="";
	this.nick_name="";
	this.avatar="";
	this.company="";
	this.phone="";
	this.title="";
	this.manager_name="";
	this.email="";
	this.password="";
	this.role="";
};

User.prototype.findUserByEmail = function(cb) {
	var db = database.getDB();
	db.one('SELECT * from users where email=$1', this.email).then(function(data) {
		var u = new User();
		u.id = data.id;
		u.first_name = data.first_name;
		u.last_name = data.last_name;
		u.nick_name = data.nick_name;
		u.avatar = data.avatar;
		u.company = data.company;
		u.phone = data.phone;
		u.title = data.title;
		u.manager_name = data.manager_name;
		u.email = data.email;
		u.password = data.password;
		u.role = data.role;
		cb(null, u);
	}).catch(function(err) {
		cb(err);
	});
};

User.prototype.comparePassword = function(candidatePassword, cb) {
	passwords.comparePassword(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// Persist User to database; also encrypts password.
User.prototype.save = function(cb) {
	var db = database.getDB();
	var user = this;
	passwords.cryptPassword(user.password, function(err, hash, salt) {
		if (err) cb(err);
		user.password = hash;
		db.none('insert into users(first_name, last_name, nick_name, avatar, company, phone, title, manager_name, email, password, role) ' +
			'values(${first_name}, ${last_name}, ${nick_name}, ${avatar}, ${company}, ${phone}, ${title}, ${manager_name}, ${email}, ${password}, ${role})', user)
			.then(function() {
				cb(null, 'success');
			})
			.catch(function(err) {
				cb(err);
			});
	});
};

module.exports = User;
