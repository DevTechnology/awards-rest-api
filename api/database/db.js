var pgp = require('pg-promise')(options);
var promise = require('bluebird');
var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var config = {
	host: '127.0.0.1',
	port: 5432,
	database: 'devtech_awards',
	poolSize: 10,
};

var db = pgp(config);

module.exports = {
	getDB: getDB
};

function getDB() { 
	console.log("Inside getDB");
	return db; 
}
