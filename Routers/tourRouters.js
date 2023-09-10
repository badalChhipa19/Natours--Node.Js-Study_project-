const express = require('express');

const {
  getAllTours,
  getTour,
  addNewTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
} = require('./../controllers/tourController');
const routers = express.Router();

routers.param('id', checkId);

routers.route('/').get(getAllTours).post(checkBody, addNewTour);
routers.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = routers;
