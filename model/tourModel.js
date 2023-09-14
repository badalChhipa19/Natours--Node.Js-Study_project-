const mongoose = require(`mongoose`);

//TODO: Creating Schema that will show the struction or the data
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour should have to have a name '],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration defined.'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a Group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty level.'],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  reatingCount: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  priceDiscount: Number,
  summery: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image.'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stratDate: [Date],
});

//TODO: Creating model for push into database
const Tour = mongoose.model('tours', toursSchema);

module.exports = Tour;
