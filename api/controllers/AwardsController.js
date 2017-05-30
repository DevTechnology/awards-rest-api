var database = require('../database/db');
var promise = require('bluebird');
var password = require('../utils/passwords');
var Award = require('../models/Award');

module.exports = {
	getAllAwards: getAllAwards,
	getAward: getAward,
	createAward: createAward
};

var db = database.getDB();

function getAllAwards(req, res, next) {
	db.any('select * from awards')
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

function getAward(req, res, next) {
	var awardID = parseInt(req.params.id);
	db.one('select * from awards where id = $1', awardID)
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

function createAward(req, res, next) {
	console.log("INCOMING REQUEST >> " + JSON.stringify(req.body));
	var award = new Award();
	award.userid = req.body.userid;
	award.nominatorid = req.body.nominatorid;
	award.comment = req.body.comment;
	award.nominatedate = req.body.nominatedate;
	award.nominationupdatedate = req.body.nominationupdatedate;
	award.nominationreviewdate = req.body.nominationreviewdate;
	award.disposition = req.body.disposition;

	award.save(function(err, success) {
		if (err) return next(err);
		res.status(200).json({
			status: 'success',
			data: "Award ID " + award.id + " created!",
			message: 'Award Created'
		});
	});
}
