var should = require('should'),
	request = require('supertest'),
	app = (../app.js),
	mongoose = require('mongoose'),
	Vacation = mongoose.model('Vacation'),
	agent = require.agent(app);

describe('Vacation Crud Test ', function(){
	it('Should allow a vacation to be posted and return an _id', function(done){
		var vacationPost = {place: 'vacations spot', duration: 8, transportation: 'bus'};
		agent.post('/api/vacations')
			.send(vacationPost)
			.expect(200)
			.end(function(err, results){
				results.body.should.have.property('_id');
				done();

			})
	})

	afterEach(function(done){
		Vacation.remove().exec();
		done();
	})
})