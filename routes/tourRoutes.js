const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

// router.param('id', tourController.checkId);

// Create a checkBody middleware
// Check if body contains the name and price property
// if not, send back 400 (bad request)
// Add it to the post stack

// aliasing

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

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
