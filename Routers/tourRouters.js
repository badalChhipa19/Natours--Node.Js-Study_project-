const express = require('express');

const { getAllTours, getTour, createTour, updateTour, deleteTour } = require(
  `./../controllers/tourController`,
);
const routers = express.Router();

// routers.param('id', checkId);

routers.route('/').get(getAllTours).post(createTour);
routers.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = routers;
