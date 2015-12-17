var express = require('express'),
  mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/msvacation');

var Vacation = require('./models/vacationModel');
var app = express();

var port = process.env.PORT || 3000;

var vacationRouter = express.Router();

vacationRouter.route('/vacations')
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
  res.send('<div style="font-size: 300px;">Meredith is on vacation.</div>');
});

app.listen(port, function(){
  console.log('Gulp is running on PORT: ' + port);
})