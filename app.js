var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var db;

if(process.env.ENV == 'Test'){
  db = mongoose.connect('mongodb://localhost/msvacation_test');
}
else {
  db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/msvacation');
}

var Vacation = require('./models/vacationModel');



var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var vacationRouter = require('./Routes/vacationRoutes')(Vacation);


app.use('/api/vacations', vacationRouter);




app.get('/', function(req, res){
  res.render('index');
});

app.use('/public', express.static('public'));

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})

module.exports = app;