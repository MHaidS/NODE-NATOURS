// 63. A BETTER FILE STRUCTURE
// 63.1. let's create a new folder called 'routes' & in there, create files for 'tourRoutes.js' & 'userRoutes.js';

// 63.4. ... 1.15... we also need to import the express module since we're using that variable
const express = require('express');

// const fs = require('fs');

// ******* ROUTE HANDLERS/CONTROLLERS *******

const tourController = require('./../controllers/tourController');

const router = express.Router();

// 64. PARAM MIDDLEWARE

// 65.3. just like in the previous challenge, we will be using this kind of logic all the time where we chain multiple kind of handlers here for the same route; for ex., we could check if a certain user is logged in or if he has the privileges or access rights, to even write a new 'tour' or any kinds of stuff that we want to happen before a 'tour' is actually created; once again, we do this bec. we want to take all the logic that is not really concerned w/ creating the new resource outside of that handler w/c is only concerned w/ the work that it is supposed to do;
router.param('id', tourController.checkID);

//router.param('id', (req, res, next, val) => {
// 64.9. transfer to 'tourControllers.js'
// console.log(`Tour id is: ${val}`);

//   next();
// });
// 64.3. suppose we have an incoming rqst on tours/'id'; that rqst will go through all these middlewares in 'app.js':
// a) the 1st is 'app.use(morgan('dev'))',
// b) then 'app.use(express.json())',
// c) then 'app.use((req, res, next) => {
//   console.log('Hello from the middleware 😀');
//   next();
// })' ,
// d) nxt is 'app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// })' ,

// f) fr. there, it goes rt. into this middleware in 'tourRoutes.js' & then this code will be ran & that's bec. it has an 'id' in the route;

// 65. CHAINING MULTIPLE MIDDLEWARE FUNCTIONS
// ******************
// 65.1. Exercise
// Create a checkBody middleware
// Check if body contains the name & price property
// If not, send back 400 (bad request)
// Add it to the post handler stack
// ******************
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price)  {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };
// ******************
// 65.2. let's analyze what happened here:
// a) so our POST rqst hits this route ---> '.route('/')'
// b) then it runs this middleware function ---> 'tourController.checkBody'
// c) it sends out this response saying teh name or price is missing ---> 'Missing name or price'
// ---------------------
// POSTMAN ===> POST: 127.0.0.1:3000/api/v1/tours ===> Create NEW tour ===> Body/raw/JSON
// {
//   "name": "Test Tour 2",
//   "duration": 5,
//   "difficulty": "easy"
// }
// ---------------------------
// Body ---> 404  Not Found
// {
//   "status": "fail",
//   "message": "Missing name or price"
// }
// ******************
// 65.3. now when we add the 'price' in Postman, everything works just fine & we get a '201 Created'; so what happened this time?
// a) it checked for the body ---> 'tourController.checkBody'
// b) & since this condition is not true ---> '(!req.body.name || !req.body.price)', it called the next middleware in the stack w/c is 'createTour'; a 'tour' is then created & sent back the result; thus, this finished the 'req-res cycle';
// ---------------------
// POSTMAN ===> POST: 127.0.0.1:3000/api/v1/tours ===> Create NEW tour ===> Body/raw/JSON
// {
//   "name": "Test Tour 2",
//   "duration": 5,
//   "difficulty": "easy",
//   "price": 100
// }
// ---------------------------
// Body ---> 201  Created
// {
//   "status": "Success",
//   "data": {
//       "tour": {
//           "id": 12,
//           "name": "Test Tour 2",
//           "duration": 5,
//           "difficulty": "easy",
//           "price": 100
//       }
//   }
// }
// ******************
router
  .route('/')
  .get(tourController.getAllTours)
  // .post(tourController.createTour);
  .post(tourController.checkBody, tourController.createTour);

// router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
