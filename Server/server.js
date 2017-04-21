//Import Libraries and setup server
var express = require("express"),
bodyParser = require('body-parser'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
MongoClient = require('mongodb').MongoClient,
format = require('util').format,
url = 'mongodb://localhost:27017/Resolutions',
swearjar = require('swearjar');

app.use(bodyParser());
var port = 8082


server.listen(port)
console.log("Server Started On Port " + port)

//Emit All Resolutions
var readnew = function(socket) {
	//Connect to Mongo server
	MongoClient.connect(url, function (err, db){
		if (err)throw err;

		//Find all resolutions from the data table
		db.collection('data').find({}).toArray(function(err, doc){
			//Emit each resolution
			for (x = 0; x < doc.length; x++){
			  	socket.emit('data', doc[x].resolution)
			  	console.log(doc[x].resolution)
			} 
			db.close()
		  });	
	});
 }


//Add New Resolution
var addnew = function(resolution){

	MongoClient.connect(url, function (err, db){
		//Check to see if the resolution is the last item (checking for re-submission) in the db
		db.collection('data').find({}).toArray(function(err, doc){
			if (resolution != doc[doc.length - 1].resolution && resolution.length < 80){
		 		if (err)throw err;

		 		//Insert resolution into the db
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


//Define POST route for '/''
app.post('/', function(req, res){
	console.log(1, "Request for /")
	//Check the post for profanity
	if (swearjar.profane(req.body.resolution) == false) {
		//If none found, add new resolution
		addnew(req.body.resolution)
	} else {
		console.log("Profanity Detected")
	}
	
});

//On new client connect, emit resolutions
io.sockets.on('connection', function (socket) {
    console.log("New Connection")
    readnew(socket)
});

//Define GET route for /
app.use('/', express.static(__dirname + "/public/"))
