var express=require('express');
var app=express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ea = require('./employee_details.js');
var moment = require('moment');
var time = require('moment-timezone');

//connecting to mongoose
mongoose.connect('add mongoDB url and username & password',{useNewUrlParser:true})
.then(()=> console.log('connection successful'))
.catch((err)=>console.error(err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));

//login api
app.post('/login',function(req,res,next){
	var date = new Date();
	var hours = d.getHours();

	// login hours check
	if(!(hours>10 && hours<18)){
		return res.json({message:"You can Login between 10:00AM to 06:00PM"});
	}

	const today = moment().startOf('day');
	query = {user_id:req.body.user_id,date:{$gte:today.toDate(),$lte:moment(today).endOf('day').toDate()}};
	ea.findOne(query,function(err,details){
		if(err) return next(err)
		if(!details){
			req.body.date = new Date();
			ea.create(req.body,function(err,post){
				if(err) return next(err)
				return res.json("successfully signed in" )	
			});
		}
		else{
			return res.json({message:"You are already logged in"});
		}
	});
});

//logout api
app.post('/logout',function(req,res,next){
	const today = moment().startOf('day')
	let query = {user_id:req.body.user_id,date:{$gte:today.toDate(),$lte:moment(today).endOf('day').toDate()}};
	let update = {logout:new Date()};
	ea.findOneAndUpdate(query,update,function(err,details){
		if(err) return next(err)
		return res.json({message:"You are successfully logged out"})	
	});
})

//get the data from the DB
app.get('/',function(req,res,next){
	ea.find(function(err,details){
	    if(err) return next(err)
		res.json(details)
	});
});

var server = app.listen(8080,function(){
	console.log("the port has been started on 8080");
});
