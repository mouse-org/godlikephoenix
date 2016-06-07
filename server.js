var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var request = require('request')


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendFile(__dirname + '/templates/index.html');
});

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})

module.exports = app;