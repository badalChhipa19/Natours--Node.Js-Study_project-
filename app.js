const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
//! Middleware -> To add data we need to add a middleware in express
app.use(express.json());

// TODO 7 - 8: Creating middleware // To create your own middleware in express we use app.use with 3 parameters 1st req, 2dn res and 3rd and most importent is next, because without next we can not proceed in excution further // This middleware is working because it is above or before all the responses that we are throwing in Step 6.2 if it putted after tem it won't work as response will already be sended.
// app.use((req, res, next) => {
//   console.log('Hello fom middleware...👋👋');
//   next();
// });

// app.use((req, _, next) => {
//   req.requestedAt = new Date().toISOString();
//   next();
// });

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

//! TODO 6.1: Declerative way of routing
// //TODO 1: Read Data form server
// app.get('/api/v1/tours', getAllTours);
// //TODO 2: Add data on The server
// app.post('/api/v1/tours', addNewTour);
// //TODO 3: Get tour with perticular id(Using param/URL) If params are optional then use ? => :X?
// app.get('/api/v1/tours/:id', getTour);
// //TODO 4: Update tour domy
// app.patch('/api/v1/tours/:id', updateTour);
// //TODO 5: Delete tour domy
// app.delete('/api/v1/tours/:id', deleteToru);

//TODO: 6.2: More declerative way of routing : We can chain as many method as we want

//TODO 10: Using Router mounting to Define Routers

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteToru);

//TODO 9: Create users route
app.route('/api/v1/users').get(getAllUsers).post(createUsers);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//TODO N:  Running the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port} prot...`);
});

//! *********************************************************************************************//

//* Normal requst
// app.get('/', (req, res) => {
//   res.send('Hello from server side...');
// });

// //* Get requiest using json
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hellow from server side...', app: 'Natours' });
// });

// //* Post requiest
// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });
