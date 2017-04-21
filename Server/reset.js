var express = require("express")
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
app.use(bodyParser());
var url = 'mongodb://localhost:27017/Resolutions';
var swearjar = require('swearjar');

//Listen on port 8080




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
