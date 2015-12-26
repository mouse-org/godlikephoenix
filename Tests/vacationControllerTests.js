var should = require('should'),
	sinon = require('sinon');

describe('Vacation Controller Tests:', function(){
	describe('Post', function(){
		it('should not allow an empty duration on post', function(){
			var Vacation = function(vacation){
				this.save = function(){}
			};

			var req = {
				body: {
					place: 'Los Angeles'
				}
			}

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			}

			var vacationController = require('../Controllers/vacationController')(Vacation);

			vacationController.post(req,res);

			res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
			res.send.calledWith('Duration is required').should.equal(true);
		})
	})
})