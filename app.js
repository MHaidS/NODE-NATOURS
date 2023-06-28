const fs = require('fs');

const express = require('express');
// 60. USING 3rd-PARTY MIDDLEWARE
// 60.1. let's install a middleware called Morgan w/c is a very pppular logging middleware that's going to allow us to see rqst data right in the console: npm i morgan
const morgan = require('morgan');

const app = express();

// ******* 1) MIDDLEWARES *******

app.use(morgan('dev'));
// app.use(morgan('tiny'));

// 60.3. https://expressjs.com/en/resources/middleware.html; prior to version 4, we would have to use 'body.parser' fr npm & use it to parse the data fr the body but now, we can just use (express.json());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 😀');

  next();
});

// 59.11. let's do another one here; & of course, we can have as many middleware functions as we like & this time we want to manipulate the 'req' object; so the signature is always the same: req, res, next; & now let's manipulate the 'req'; what we want to do in this case is to add the current time to the 'req'; so we simply define a property called 'requestTime' on the 'req' object & then set it to a 'new Date()' w/c translates to rt. now; & then use a very handy date function called 'toISOString' w/c will convert it into a nice, readable string for us; so let's pretend we have some route handler that really needs the info about when exactly the 'req' happens & the very simple solution is to simply add something like this to a 'req' using middleware, then call the nxt middleware in the stack; so let's use some route handler for getting all tours ('getAllTours').....
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ******* 2) ROUTE HANDLERS/CONTROLLERS *******
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',

    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUsers = (req, res) => {
  req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
// 62. CREATING & MOUNTING MULTIPLE ROUTERS
// 62.1. we'll now create multiple routers & use a process called 'mounting'; keep in mind that the ultimate goal is to be able to separate all the code that we have in this file into multiple files; one file for 'routes', then another one for the 'users', another one that contain 'handlers' only for the 'users' & then another that contain 'handlers' only for the 'tours'; but before we can do this, we have to create separate routers for each of our resources;
// 62.2. we can say that all 4 of our routes are kind of on the same router & it's this 'app' object; but if we want to separate these routes into diff. files: one file for the 1st 2 routes (for the tours) & another file for the last 2 routes (for the users);
// ******* 3) ROUTES *******
// 62.3. so we create a new router & save it into this var 'tourRouter' & then use it for the 1st 2 routes, we'll use 'tourRouter' instead of 'app'; so how do we connect this new router to our application? we'll use it as a middleware bec this new modular tool router 'tourRouter' is actually a real middleware; we want to use the 'tourRouter' on this specific route, '/api/v1/tours', so we use 'app.use', specify the middleware function w/c is this router, then specify the route(the url we want to use that middleware on) & just like this, we created a sub-application...
// app.use('/api/v1/tours', tourRouter);
// 62.5.   .... 5:40 let's mount a router on a route; now, these hve to come after all of these definitions or at least after we declared a variable; so we cannot use the routers before we declare them, so let's move them at the bottom, after the userRouter;

// app.use('/api/v1/users', userRouter);

const userRouter = express.Router();
const tourRouter = express.Router();

// 62.4. ... there's just another thing we have to change here: instead of '.route('/api/v1/tours')', we only want ('/') & for '.route('/api/v1/tours/:id')', we just want ('/:id'); the reason is bec. the 'tourRouter' middleware only runs on these route '/api/v1/tours' anyway; so now this route ('/') of our mini-application means '/api/v1/tours'; let's now go ahead & do the same for 'users';
tourRouter
  // .route('/api/v1/tours')
  .route('/')
  .get(getAllTours)
  .post(createTour);

// 59.9. let's comment this out & place back at the top
// app.use((req, res, next) => {
//   console.log('Hello from the middleware 😀');
//   next();
// });

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
// app
//   .route('/api/v1/tours/:id')
//   .get(getTour)
//   .patch(updateTour)
//   .delete(deleteTour);
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours/2
// TERMINAL ===> Hello from the middleware 😀
//              { id: '2' }

// app.get('/api/v1/tours/:id', getTour);
// app.get('/api/v1/tours/:id', (req, res) => {
//   // app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {

// 62.7. so just like before, if there's a rqst for ('/api/v1/users'), the rqst will enter the middleware stack & when it hits the middleware ('app.use('/api/v1/users', userRouter);' in this case), it will run the 'userRouter' bec. this route '/api/v1/users' has been matched.
userRouter
  // .route('/api/v1/users')
  .route('/')
  .get(getAllUsers)
  .post(createUsers);
// app
//   .route('/api/v1/users')
//   .get(getAllUsers)
//   .post(createUsers);

userRouter
  // .route('/api/v1/users/:id')
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

// 62.6. ...(fr 62.3 & 62.5) moved fr the beginning of ROUTES section;
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 62.8. let's test the routes on Postman & everything still works for tours & users meaning that our 2 new routers: tourRouter & userRouter were both correctly mounted;

// ******* 4) SERVER *******
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
