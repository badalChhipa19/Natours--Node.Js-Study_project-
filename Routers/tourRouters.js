const express = require('express');

const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
} = require('./../controllers/tourController');

const routers = express.Router();

routers.route('/').get(getAllTours).post(addNewTour);
routers.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = routers;
