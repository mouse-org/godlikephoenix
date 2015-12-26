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
	      else
	        res.json(vacations);
	    });
	}

	return {
		post: post,
		get: get
	}

}

module.exports = vacationController;  