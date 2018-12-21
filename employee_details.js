var mongoose = require('mongoose');
var eaSchema = new mongoose.Schema({
	user_id:String,
	date:Date,
	login:Date,
	logout:Date
	
});

module.exports = mongoose.model('ea',eaSchema)