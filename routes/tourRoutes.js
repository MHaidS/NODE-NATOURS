// 63. A BETTER FILE STRUCTURE
// 63.1. let's create a new folder called 'routes' & in there, create files for 'tourRoutes.js' & 'userRoutes.js';

// 63.4. ... 1.15... we also need to import the express module since we're using that variable
const express = require('express');
// 63.19. transferred fr app.js & we get another error: 'ENOENT: no such file or directory' bec. this folder '/dev-data/data/tours-simple.json' is not defined as the current __dirname is the 'routes' .....
// const fs = require('fs');

// 63.15. transferred this pc. of code fr app.js; this is where we actually read the tours fr the JSON file
// 63.20. ... so we need to get out of 'routes'; we'll have to go up 1 folder, & then in there, go into dev-data/data/tours-simple.json; & it's now working just fine. same as the routes in Postman when we retest them;
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// 63.25. ... & w/ that being said, let's take it 1 step further & actually remove these route handlers fr the 'tourRoutes.js' file; let's create a new folder here called 'controllers'; we've been calling them 'route handlers' so it would make sense to create a handlers folder; but later in the course, we will start using a software architecture called the Model View Controller & in it, these handler functions are actually called controllers; & so that's why I'm going to call the folder & also the files in there, 'controllers'; let's now create the 'tourController.js' & 'userController.js' files inside the 'controllers' folder...
// 63.26. ... let's now take this code & put these handlers into the the 'tourController.js' file; transfer the fs module as well found at the beginning of this file 'const fs = require('fs');'
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// // 63.8. functions/route handlers for 'tours' transferred fr app.js; now let's do the same for the 'users' on userRoutes.js
// ******* ROUTE HANDLERS/CONTROLLERS *******
// const getAllTours = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',

//     requestedAt: req.requestTime,
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// const getTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tour,
//     },
//   });
// };

// const createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'Success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };

// const updateTour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// };

// const deleteTour = (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// };

// 63.29. ... now let's import the tour controllers/functions fr 'tourController.js'; so 'const tourController = require(...'; now we're in the routes folder here './', so we need to move up 1 lvl '../' & then go into controllers & into the tourController.js; remember that when we export data fr a file using the exports obj (just like in tourController.js); when we then import everything into 1 obj, then all of the data that was on exports is now going to be on 'tourController'; & so we will have 'tourController.getAllTours.createTour.getTour.updateTour.deleteTour'; so this obj. 'tourController' is equivalent to the exports that we have in 'tourController.js' ... 11.06 ...
const tourController = require('./../controllers/tourController');
// 63.31. another option is we could have also used destructuring by specifying the exact names instead of just the 'tourController' w/o having to write 'tourController.' but what we have just done makes it nicely visible that all of these functions actually come fr this 'tourController' module; let's save it & it's now working as well as on Postman;
// --------------------------
// const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController');
// const router = express.Router();
// router
//  .route('/')
//  .get(getAllTours)
//  .post(createTour);
// router
//  .route('/:id')
//  .get(getTour)
//  .patch(updateTour)
//  .delete(deleteTour);
// --------------------------

// 63.3. take the tourRouters fr app.js & paste them in 'tourRoutes.js'
// 63.5. it's kind of a convention to just call this 'router' instead of tourRouter; so let's now export the 'router' & then import in our main application
// const tourRouter = express.Router();
const router = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// 63.30. ... so all we have to do is just create 'tourController' & that's it;
// router.route('/').get(getAllTours).post(createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
// router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// 63.6. when we only have 1 thing to export, we use 'module.exports' equal to 'router'; save & errors are still recvd since this is not yet defined in our main applic. later; what's also not defined here are the functions/route handlers on this file; copy fr app.js & paste them here;
module.exports = router;

// -------------------------
// ./ means "starting from the current directory". . refers to the current working directory, so something like ./foo.bar would be looking for a file called foo.bar in the current directory. (As a side note, .. means refers to the parent directory of the current directory. So ../foo.bar would be looking for that file one directory above.)
