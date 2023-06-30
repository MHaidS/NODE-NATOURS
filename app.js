// 63.21. so we have our routers now in their own separate files & each of them is 1 small sub-application: tour application (tourRoutes.js) & user application (userRoutes.js); then we put everything together in this global app file by importing these routers (63.17) & then mounting the routers on the 2 diff. routes that we have currently implemented:
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);
// ... so again, these are where we mount our routers....
// 63. A BETTER FILE STRUCTURE
// 63.1. let's create a new folder called 'routes' & in there, create files for 'tourRoutes.js' & 'userRoutes.js';

// 63.18. we actually don't need it here; transfer it to 'tourRoutes.js'
// const fs = require('fs');

const express = require('express');

const morgan = require('morgan');

// 63.17. import the tourRouter & the userRouter so that the routes '/api/v1/tours' & '/api/v1/users' will continue to work; now we still got an error 'fs is not defined';
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ******* 1) MIDDLEWARES *******
// 63.23. so the 'app.js' file is mainly used for middleware declarations; in this case, we have the 1st 4 middlewares here w/c we want to apply to all of the routes; & for this route '/api/v1/tours', we want to apply the 'tourRouter' middleware; then for this route '/api/v1/users', we want to apply the 'userRouter' middleware....
app.use(morgan('dev'));
// app.use(morgan('tiny'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😀');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 63.14. this one here shd. also be transferred to 'tourRoutes.js', this pc. of code where we actually read the tours fr the JSON file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// ******* 2) ROUTE HANDLERS/CONTROLLERS *******
// 63.7. transfer the functions/route handlers for tours to tourRoutes.js
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

// 63.12. transfer the functions/route handlers for users to userRoutes.js
// const getAllUsers = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const createUsers = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const getUser = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const updateUser = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const deleteUser = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// 63.10. take the userRouters & transfer to 'userRoutes.js'
// const userRouter = express.Router();

// 63.2. take the tourRouters & paste them in 'tourRoutes.js'
// const tourRouter = express.Router();

// 63.16. finally, we need to import the tourRouter & the userRouter so that the routes '/api/v1/tours' & '/api/v1/users' continue to work;
// 63.22. ... for now, the most impt. thing to keep in mind is that we created these diff. routers for each of the resources to have a nice separation of concern bet. these resources, basically creating 1 small applic. for each of them & then putting everything together in 1 main app file, app.js;
// 63.24. ... again, 'tourRouter' & 'userRouter' are actually middlewares w/c is why we can use 'app.use' in order to mount them....

// ******* ROUTES *******
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 63.38. ... let's use 'module.exports' for us to export our application fr this file, 'app.js'; so now, we have everything that is basically the application configuration in 1 standalone file; let's go back to 'server.js' to import this;
module.exports = app;

// ******* 4) SERVER *******
// 63.36. let us now transfer the 'SERVER' fr 'app.js' to 'server.js'
// const port = 3000;

// app.listen(port, () => {
//   console.log(`App running on port ${port}.....`);
// });

// 63.16. finally, we need to import the tourRouter & the userRouter so that the routes on 'userRoutes.js' & 'tourRoutes.js' continue to work;

//+++++++++++++++++++++++++++
// 63.35. ...13.21 ... so just to recap, the flow goes like this:
// 63.35.a. we start receiving the rqst in the 'app.js' file; it will then enter either 1 of the routers: 'tourRoutes.js' or 'userRoutes.js';
// 63.35.b. depending again on the route & the rqst, it will execute 1 of the controllers in either 'tourController.js' or 'userController.js'; & that is where the 'response' gets sent finally, finishing the req/res cycle;
// 63.35.c. so we now have 3 files involved in the process: 'app.js', 'tourRoutes.js' or 'userRoutes.js', 'tourController.js' or 'userController.js', instead of having everything just in 1 file; now, we'll be adding 1 more step here, that is, to create 'server.js' bec. it's a good practice to have everything that is related to express & to the server in 1 file; so rt. now, 'server.js' is going to be our starting file where everything starts & where we listen to our server;
// 63.36. let us now transfer the 'SERVER' fr 'app.js' to 'server.js'
// 63.37. 'SERVER' transferred fr 'app.js' to 'server.js'; this module doesn't know about 'app' so we need to import it; but before that, we 1st need to export it, so let's go back to 'app.js'.....
// 63.38. ... let's use 'module.exports' for us to export our application fr this file, 'app.js'; so now, we have everything that is basically the application configuration in 1 standalone file; let's go back to 'server.js' to import this;
// 63.39. let us now import 'app.js' in 'server.js'; so 'const app =' then 'require' since this is our own module; we also need to use './' to say that we're in the current folder, then it's simply 'app'; later on, we will actually have other stuff in this file that is not related to express but still related to our application: stuff like database configurations or some error handling stuff or environment variables; all of these will live in this 'server.js' file, w/c is kind of our entry point;
// 63.40. so now, let's finish the process that we have here bec. we will no longer run 'nodemon app.js'; instead, we need to run 'server.js'; so let's create an npm script in 'package.json' under "scripts": so fr. ...
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
// .... change it to ...
// "scripts": {
//   "start": "nodemon server.js"
// },
// ... this way, we no longer have to specify w/c file we actually want to run, we just have to write 'npm start'; this works even w/o having 'nodemon' installed as our dev dependency (npm i nodemon --save dev) since it has been installed globally previously (npm i nodemon --global); to check version of nodemon (nodemon -v); so now we have our app correctly refactored;
