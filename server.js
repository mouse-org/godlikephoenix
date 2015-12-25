var express = require('express'),
  mongoose = require('mongoose');
  bodyParser = require('body-parser');


var db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/msvacation');

var Vacation = require('./models/vacationModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var vacationRouter = express.Router();

vacationRouter.route('/vacations')
  .post(function(req, res){
    var vacation = new Vacation(req.body);
    
    console.log(vacation);
    res.send(vacation);

  })
  .get(function(req,res){

    var query = {};
    if(req.query.place)
      {
        query.place = req.query.place;
      }
    Vacation.find(query, function(err,vacations){
      if(err)
        res.status(500).send(err);
      else
        res.json(vacations);
    });
  });

vacationRouter.route('/vacations/:vacationId')
  .get(function(req,res){

    Vacation.findById(req.params.vacationId, function(err,vacation){
      if(err)
        res.status(500).send(err);
      else
        res.json(vacation);
    });
  });

app.use('/api', vacationRouter);




app.get('/', function(req, res){
  res.send('<div style="font-size: 300px; font-family: sans-serif; font-weight: bold; line-height: 80%;">Meredith is on vacation!</div>');
});

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})