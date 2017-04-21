//Import Libraries and setup server
var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app);
var port = 8082
var io = require('socket.io').listen(server);
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
app.use(bodyParser());
var url = 'mongodb://localhost:27017/Resolutions';
var swearjar = require('swearjar');

//Listen on port 8080
server.listen(port)
console.log("Server Started On Port " + port)



 var readnew = function(socket) {
	MongoClient.connect(url, function (err, db){
	if (err)throw err;
	console.log("Connected correctly to server");

	db.collection('data').find({}).toArray(function(err, doc){
		for (x = 0; x < doc.length; x++){
		  	socket.emit('data', doc[x].resolution)
		  	console.log(doc[x].resolution)
		} 
		db.close()
	  });	
	
});

 }


var addnew = function(resolution){
    
	MongoClient.connect(url, function (err, db){


		db.collection('data').find({}).toArray(function(err, doc){
			if (resolution != doc[doc.length - 1].resolution && resolution.length < 80){
		 		if (err)throw err;
				console.log("Connected correctly to server");
				db.collection("data").insert({"resolution" : resolution}, function(err, doc) {
			    	if(err){
			    		throw err;
			   		} else { 
			   		 	console.log("Item Added") 
			   		 	io.emit('data', req.body.resolution)
			    	}
			    db.close()
				});
			}

		});
	});
}

//Define POST route for /
app.post('/', function(req, res){
	console.log(1, "Request for /")
	if (swearjar.profane(req.body.resolution) == false) {
		addnew(req.body.resolution)
	} else {
		console.log("Profanity Detected")
	}
	
});

io.sockets.on('connection', function (socket) {
    console.log("New Connection")
    readnew(socket)
});
//Define GET route for /
app.use('/', express.static(__dirname + "/public/"))

// readnew()
