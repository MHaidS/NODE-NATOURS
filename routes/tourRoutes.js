// 63. A BETTER FILE STRUCTURE
// 63.1. let's create a new folder called 'routes' & in there, create files for 'tourRoutes.js' & 'userRoutes.js';

// 63.4. ... 1.15... we also need to import the express module since we're using that variable
const express = require('express');

// const fs = require('fs');

// 63.20. ... so we need to get out of 'routes'; we'll have to go up 1 folder, & then in there, go into dev-data/data/tours-simple.json; & it's now working just fine. same as the routes in Postman when we retest them;
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// 63.26. ... let's now take this code & put these handlers into the the 'tourController.js' file; transfer the fs module as well found at the beginning of this file 'const fs = require('fs');'
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// ******* ROUTE HANDLERS/CONTROLLERS *******

const tourController = require('./../controllers/tourController');
// 63.31. another option is we could have also used destructuring by specifying the exact names instead of just the 'tourController' w/o having to write 'tourController.' but what we have just done makes it nicely visible that all of these functions actually come fr this 'tourController' module; let's save it & it's now working as well as on Postman;
// --------------------------

const router = express.Router();

// 64. PARAM MIDDLEWARE
// 64.1. 'Param Middleware' is a middleware that only runs when we have a certain parameter in our URL; in our ex., the only parameter that we have in our route URL is the 'id'; so we can write middleware that only runs when this 'id' is present in the URL; so it's on our 'router' & then the 'param()' method, so here we specify the parameter this middleware is going to run & it's called 'id' & of course our actual middleware function; we still have access to the 'req' & 'res' obj. as well as the 'next' function; in a param middleware function, we actually have access to a 4th argument & that is the value of the parameter in question & we usu. call it 'val' w/c stands for value;

// 64.11. & we can now refactor code to replace
// (req, res, next, val) => {
//   next();
// });
// ... w/ our newly created function; let's check in Postman; again it won't work on a url w/o an id like 'getAllTours'; but for 'getTour' w/ an id on its url, '127.0.0.1:3000/api/v1/tours/2', the id of 2 will be logged on the terminal:
// TERMINAL ===>
// Hello from the middleware 😀
// Tour id is: 2
// { id: '2' }
// GET /api/v1/tours/2 200 8.971 ms - 899
// .... we get the 'Tour id is:' logged so that meant it did actually run our 'checkID' middleware; & if we try an invalid id (GET: 127.0.0.1:3000/api/v1/tours/23), we then get our invalid id message, the 404 error code & our tour id number; we no longer have the check id code in our 'getTour', 'updateTour' & 'deleteTour' handler functions but still, the 'id' is checked bec. we have this middleware:
// console.log(`Tour id is: ${val}`);
//  if (req.params.id * 1 > tours.length) {
//    return res.status(404).json({
//      status: 'fail',
//      message: 'Invalid ID',
//    });
//  }
// next();
// .... in the stack, before it actually hits the 'getTour', 'updateTour' or  'deleteTour' tourController; so this middleware is now part of our pipeline; you might argue that we can just create a simple function w/c could also check for the ID & call that function inside of each of the tour functions & then call it inside of each of these relevant tourControllers but that would really go against the philosophy of Express, where we shd. always work w/ the middleware stack, so w/ this pipeline as much as we can; so the handler functions don't have to worry at all about validation; each of these functions only has to do what they say, that is, 'getTour', 'updateTour' or 'deleteTour', they don't have to check the 'id'; & if we would add another controller, depending on the id, then it would automatically check if the id is invalid as well w/o us having to do any additional steps; this is how Express apps shd. work & so now we have another tool in our express toolbox that we can now use in order to write our Express applications;

router.param('id', tourController.checkID);

//router.param('id', (req, res, next, val) => {
// 64.9. transfer to 'tourControllers.js'
// console.log(`Tour id is: ${val}`);
// 64.2. we also need to call next(), otherwise, the 'req/res' cycle will get stuck in this middleware function & it's not going to be able to move on to the nxt middleware in the stack, that would be the routes below; let's test it out on Postman; we won't see any logs if we sent a rqst w/o any 'id' but if we did,'2' in this case, the results will look just like what we got here below; now the log 'Tour id is:' came fr this function; also, this middleware function will not run for any of the user routes bec. it is only specified in our tour router; if you will send rqst for 'get user', the log you will see is only fr morgan & the custom middleware found in appljs; basically, each router is kind of a mini sub-application, 1 for each resource; & so since this middleware is only specified on this router, then it is only part of the middleware stack if we are actually inside of this sub-application;
//   next();
// });
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours/2 ==> 64.2
// TERMINAL ===>
// Hello from the middleware 😀
// Tour id is: 2
// { id: '2' }
// GET /api/v1/tours/2 200 8.384 ms - 899

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
// e) so all these are part of the middleware stack & then it will finally hit this middleware since this is actually the route that will get into the 'tourRouter' middleware: 'app.use('/api/v1/tours', tourRouter)' ,
// f) fr. there, it goes rt. into this middleware in 'tourRoutes.js' & then this code will be ran & that's bec. it has an 'id' in the route;
// 'router.param('id', (req, res, next, val) => {
//    console.log(`Tour id is: ${val}`);
//    next();
// });
// g) else, this would simply be ignored & would move to the nxt middleware in the stack:
// router
//   .route('/')
//   .get(tourController.getAllTours)
//   .post(tourController.createTour);
//
// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);
//  ...... so that is how param middleware works; it's not really that useful for now but we can actually use it for a very practical use case here so let's go to our handler functions in 'tourController.js'........

// tourRouter.route('/').get(getAllTours).post(createTour);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
