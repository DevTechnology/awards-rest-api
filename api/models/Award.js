var database = require('../database/db');

function Award() {
	this.userid=0;
	this.nominatorid=0;
	this.rating=0; // 0-5
	this.comment="";
	this.nominatedate=null;
	this.nominationupdatedate=null;
	this.nominationreviewdate=null;
	this.disposition="";
};

Award.prototype.save = function(cb) {
	var db = database.getDB();
	var award = this;
	console.log("Persisting Award -> " + JSON.stringify(award));
	db.none('insert into awards(userid, nominatorid, rating, comment, disposition, nominatedate, nominationupdatedate, nominationreviewdate) ' +
		'values (${userid}, ${nominatorid}, ${rating}, ${comment}, ${disposition}, ${nominatedate}, ${nominationupdatedate}, ${nominationreviewdate})', award)
		.then(function() {
			cb(null, 'success');
		})
		.catch(function(err) {
			cb(err);
		});
};

module.exports = Award;
