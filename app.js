const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Routers/tourRouters');
const userRouter = require('./Routers/userRouters');

const app = express();

if (process.env.NODE_ENV === 'development') {
  //! Middleware -> To add data we need to add a middleware in express
  app.use(morgan('dev'));
}
app.use(express.json());

//TODO 8: 3rd tarty middleware // Morgan middleware use to log details about req or res.

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
