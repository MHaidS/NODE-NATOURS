const express = require('express');

// ******* ROUTE HANDLERS/CONTROLLERS *******

const tourController = require('./../controllers/tourController');

const router = express.Router();

// 64. PARAM MIDDLEWARE
router.param('id', tourController.checkID);
//router.param('id', (req, res, next, val) => {

// console.log(`Tour id is: ${val}`);

// b) then 'app.use(express.json())',

// 65. CHAINING MULTIPLE MIDDLEWARE FUNCTIONS
// ******************

// 65.2. let's analyze what happened here:

// a) it checked for the body ---> 'tourController.checkBody'
// ---------------------
router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.createTour);
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
