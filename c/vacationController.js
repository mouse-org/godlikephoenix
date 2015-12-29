var vacationController = function(Vacation){

	var post = function(req, res){
	    var vacation = new Vacation(req.body);
	    
	    if(!req.body.duration){
	    	res.status(400);
	    	res.send('Duration is required');
	    }
	    else {

	    vacation.save();
	    res.status(201);
	    res.send(vacation);
		}
	}

	var get = function(req,res){

    var query = {};
	    if(req.query.place)
	      {
	        query.place = req.query.place;
	      }
	    Vacation.find(query, function(err,vacations){
	      if(err)
	        res.status(500).send(err);
	      else {

	      	var returnVacations = [];
	      	vacations.forEach(function(element, index, array){
	      		var newVacation = element.toJSON();
	      		newVacation.links =  {};
	      		newVacation.links.self = 'http://' + req.headers.host + '/api/vacations/' + newVacation._id
	      		returnVacations.push(newVacation)
	      	});
	        res.json(returnVacations);
	    	}
	    });
	}

	return {
		post: post,
		get: get
	}

}

module.exports = vacationController;  