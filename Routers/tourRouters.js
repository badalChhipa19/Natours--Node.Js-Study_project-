const express = require('express');

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require(`./../controllers/tourController`);
const routers = express.Router();

// routers.param('id', checkId);

//Todo: Createing an aliasing rout
routers.route('/top-5-cheap').get(aliasTopTours, getAllTours);

//TODO: Routes
routers.route('/').get(getAllTours).post(createTour);
routers.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = routers;
