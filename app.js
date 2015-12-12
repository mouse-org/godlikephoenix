var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.send('Meredith is on vacation!');
});

app.listen(port, function(){
  console.log('Running on PORT: ' + port);
})