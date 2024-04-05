const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .put(tourController.updateTour)
  .get(tourController.getOneTour)
  .delete(tourController.deleteTour);

module.exports = router;
