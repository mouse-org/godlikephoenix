var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var vacationModel = new Schema({
  place: {
    type: String
  },
  transportation: {
    type: String
  },
  duration: {
    type: Number
  }

});

module.exports = mongoose.model('Vacation', vacationModel);