var express = require('express')

var routes = function(Vacation){

var vacationRouter = express.Router();

var vacationController = require('../controllers/vacationController.js')(Vacation)

vacationRouter.route('/')
  .post(vacationController.post)
  .get(vacationController.get);
vacationRouter.use('/:vacationId', function(req,res,next){
	Vacation.findById(req.params.vacationId, function(err,vacation){
      if(err)
        res.status(500).send(err);
      else if(vacation)
      {
      	req.vacation = vacation;
      	next();
      }
      else
      {
        res.status(404).send('No vacation');
	    }
	});
});


vacationRouter.route('/:vacationId')
  .get(function(req,res){

  	var returnVacation = req.vacation.toJSON();

  	returnVacation.links = {};
  	var newLink = 'http://' + req.headers.host + '/api/vacations/?place=' + returnVacation.place;

  	returnVacation.links.FilterByThisPlace = newLink.replace(' ', '%20');

  	res.json(returnVacation);
    
  })

  .put(function(req, res){
  	req.vacation.place = req.body.place;
  	req.vacation.duration = req.body.duration;
  	req.vacation.transportation = req.body.transportation;
  	req.vacation.save(function(err){
  		if(err){
  			res.status(500).send(err)
  		}
  		else {
  			res.json(req.vacation);
  		}
  	});
  })

  .patch(function(req, res){
  	if(req.body._id){
  		delete req.body._id;
  	}
  	for(var j in req.body){
  		req.vacation[j] = req.body[j]
  	}
  	req.vacation.save(function(err){
  		if(err){
  			res.status(500).send(err)
  		}
  		else {
  			res.json(req.vacation);
  		}
  	});
  })

  .delete(function(req, res){
  	req.vacation.remove(function(err){
  		if(err){
  			res.status(500).send(err);
  		}
  		else {
  			res.status(204).send('Removed');
  		}
  	});
  });

  return vacationRouter;

};

module.exports = routes;

