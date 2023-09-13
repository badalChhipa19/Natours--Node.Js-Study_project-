const mongoose = require(`mongoose`);

//TODO: Creating Schema that will show the struction or the data
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour should have to have a name '],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
});

//TODO: Creating model for push into database
const Tour = mongoose.model('tours', toursSchema);

module.exports = Tour;
