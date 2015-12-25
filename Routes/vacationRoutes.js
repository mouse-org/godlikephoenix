var express = require('express')

var routes = function(Vacation){

	var vacationRouter = express.Router();

vacationRouter.route('/')
  .post(function(req, res){
    var vacation = new Vacation(req.body);
    
    vacation.save();
    res.status(201).send(vacation);

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

vacationRouter.route('/:vacationId')
  .get(function(req,res){

    Vacation.findById(req.params.vacationId, function(err,vacation){
      if(err)
        res.status(500).send(err);
      else
        res.json(vacation);
    });
  });

  return vacationRouter;

};

module.exports = routes;

