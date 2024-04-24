const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'the tour mmust have a name '],
    unique: true,
  },
  rating: {
    type: Number,
    default: 3.5,
  },
  price: {
    type: Number,
    require: [true, 'the tour must have a price '],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
