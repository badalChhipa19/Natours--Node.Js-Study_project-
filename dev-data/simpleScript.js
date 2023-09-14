const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../model/tourModel');

dotenv.config({ path: `./../config.env` });
console.log(process.env.DATABASE);
//Reading File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);

//
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successFully..'))
  .catch((err) => console.log('Error in conecting wiht atlas: ', err));

const insert = async () => {
  try {
    await Tour.create(tours);
    console.log('Insert successfully...');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

const deleteAll = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Delete successfully...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  insert();
}
if (process.argv[2] === '--delete') {
  deleteAll();
}
