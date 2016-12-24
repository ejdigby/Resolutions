//Import Libraries and setup server
var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app);
var port = 8080
var io = require('socket.io').listen(server);
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
app.use(bodyParser());


//Listen on port 8080
server.listen(port)
console.log("Server Started On Port " + port)
resolutions = []

var url = 'mongodb://localhost:27017/Resolutions';
MongoClient.connect(url, function (err, db){
if (err)throw err;
console.log("Connected correctly to server");


db.collection('data').find({}).toArray(function(err, doc){
    resolutions = [];
	for (x = 0; x < doc.length; x++){
	  	resolutions.push(doc[x].resolution);
	} 
	console.log(resolutions)
  });	

});


//Define POST route for /
app.post('/', function(req, res){
	console.log(1, "Request for /")
	
});

//Define GET route for /
app.use('/', express.static(__dirname + "/public/"))
