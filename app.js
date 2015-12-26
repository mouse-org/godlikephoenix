var express = require('express'),
  mongoose = require('mongoose');
  bodyParser = require('body-parser');


var db;
if(process.env.ENV == 'Test'){
  db = mongoose.connect('mongodb://localhost/msvacation_test');
}
else {
  db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/msvacation');
}

var Vacation = require('./models/vacationModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


vacationRouter = require('./Routes/vacationRoutes')(Vacation);


app.use('/api/vacations', vacationRouter);




app.get('/', function(req, res){
  res.send('<div style="font-size: 300px; font-family: sans-serif; font-weight: bold; line-height: 80%;">Meredith is on vacation!</div>');
});

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})

module.exports = app;