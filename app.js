const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
//! Middleware -> To add data we need to add a middleware in express
app.use(express.json());

//TODO 8: 3rd tarty middleware // Morgan middleware use to log details about req or res.
app.use(morgan('dev'));

//TODO: File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//TODO 6: Handler fucntions for tours requiests
const getAllTours = (req, res) => {
  //* Using value passed by middle in step 7
  console.log(req.requestedAt);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const addNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const reqBody = req.body;
  const newTour = Object.assign({ id: newId }, reqBody);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        ststus: 'success',
        data: {
          newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    message: '<Tour updated>',
  });
};

const deleteToru = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    message: null,
  });
};

//TODO 9.1: Handler Functions for Users requiests
const getAllUsers = (req, res) => {
  res.status(500 /* Internal server error */).json({
    status: 'error',
    message: 'Yet to Work',
  });
};
const getUser = (req, res) => {
  res.status(500 /* Internal server error */).json({
    status: 'error',
    message: 'Yet to Work',
  });
};
const createUsers = (req, res) => {
  res.status(500 /* Internal server error */).json({
    status: 'error',
    message: 'Yet to Work',
  });
};
const updateUser = (req, res) => {
  res.status(500 /* Internal server error */).json({
    status: 'error',
    message: 'Yet to Work',
  });
};
const deleteUser = (req, res) => {
  res.status(500 /* Internal server error */).json({
    status: 'error',
    message: 'Yet to Work',
  });
};

//TODO 10: Using Router mounting to Define Routers

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(addNewTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteToru);

//TODO 9: Create users route
userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

//TODO 10.1:
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

//TODO N:  Running the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port} prot...`);
});

//! *********************************************************************************************//
