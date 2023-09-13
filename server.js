const dotenv = require(`dotenv`);
const mongoose = require(`mongoose`);

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

//* Connection string from atlas
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//TODO: Connecting with mongoDB atlas(remote)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successFully..'))
  .catch((err) => console.log('Error in conecting wiht atlas: ', err));

//TODO: Creating Schema that will show the struction or the data
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Tour should have to have a name '],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    require: [true, 'Tour must have a price'],
  },
});

//TODO: Creating model for push into database
const Tour = mongoose.model('tours', toursSchema);

//TODO:
const testTour = new Tour({
  name: 'The Forest Hiker',
  price: 497,
  rating: 4.7,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log('Error: ', err));

//TODO N:  Running the server on port 3000
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
