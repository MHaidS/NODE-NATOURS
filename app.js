const fs = require('fs');

const express = require('express');

const app = express();

// 59. Creating Our Own Middleware
// 59.1. to use a middleware (express.json()), we use 'app.use()' method; this (express.json()) calling the json method basically returns a function; & similar to that, we can create our own middleware function;
app.use(express.json());
// 59.2. so, we still need to use 'app.use()'; in each middleware function, we have access to the req & res, but we also have the 'next' function as the 3rd argument to this middleware, w/c is the convention to avoid confusion but we can call whatever we want, same w/ 'req' & 'res'; w/ the said structure, express knows that we are actually defining a middleware here;

// 59.10. uncomment this custom middleware here since it shd come before all route handlers;
app.use((req, res, next) => {
  console.log('Hello from the middleware 😀');
  // 59.3. we now need to call the 'next' function bec. if we didn't, the req/res cycle would really be stuck at this point; so we must never forget to use 'next' in all of your middleware; & all we have to do is to specify 'next'; & w/ that we're ready to test it out by sending a simple rqst to our API in Postman; it doesn't matter w/c one we're going to use as it applies to every single rqst bec. we didn't specify any route;
  next();
});
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours
// TERMINAL ===> Hello from the middleware 😀

// 59.11. let's do another one here; & of course, we can have as many middleware functions as we like & this time we want to manipulate the 'req' object; so the signature is always the same: req, res, next; & now let's manipulate the 'req'; what we want to do in this case is to add the current time to the 'req'; so we simply define a property called 'requestTime' on the 'req' object & then set it to a 'new Date()' w/c translates to rt. now; & then use a very handy date function called 'toISOString' w/c will convert it into a nice, readable string for us; so let's pretend we have some route handler that really needs the info about when exactly the 'req' happens & the very simple solution is to simply add something like this to a 'req' using middleware, then call the nxt middleware in the stack; so let's use some route handler for getting all tours ('getAllTours').....
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // 59.14. .... we'll call 'next()' & so let's test this now on Postman; remember it's on ('getAllTours'); & on the Terminal, it shows 'requestedAt' & then today's date w/c came fr our middleware bec. we added that property to our 'req';
  next();
});
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours
// TERMINAL ===> Hello from the middleware 😀
//               2023-06-27T14:04:35.280Z

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 59.7. .... so here is the 'getAllTours' function & by sending a result w/ 'res.json()', we actually end the req/res cycle; so, the nxt middleware in the stack, the custom one, won't get called anymore bec. the cycle has already finished; make sure to understand that this order really matters a lot in Express & this is how Express apps work

const getAllTours = (req, res) => {
  // 59.12. ..... to simply log those for us to the console...
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    // 59.13. ... or we could even send this in the 'res' as well & let's call this one 'requestedAt: req.requestTime'; so our middleware is at line29(59.11) .....
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

// 59.4. all route handlers here are actually kind of middleware themselves; they are simply middleware functions that only apply for a cerain URL or route but the simple one we defined earlier at the top (59.2) will apply to every single rqst, at least, if the route handler comes before this middleware; so let's put that one after this route handler.....
// 59.6. let's see what happens when we make a call to this route after placing the route handler fr (59.2) after it; let's use the same rqst we did earlier but now nothing is logged on the Terminal; that's bec. this route handler comes before the one that will log ('Hello from the middleware 😀') & (getAllTours) actually ends the req/res cycle, so let's take a look at that .....
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours
// TERMINAL ===>  ( ***no output*** )
app.route('/api/v1/tours').get(getAllTours).post(createTour);
// 59.5. .... route handler fr (59.2);
// 59.9. let's comment this out & place back at the top
// app.use((req, res, next) => {
//   console.log('Hello from the middleware 😀');
//   next();
// });

// 59.8. let's make another test & let's try to see what happens when we do a rqst to this route, (getTour) or (updateTour) or (deleteTour) the last one in this case; let's send a 'getTour' rqst in Postman & the Terminal shows 'Hello from the middleware 😀' bec. the custom middleware is placed before the route handler we made a rqst on & it is part of the middleware stack that get executed before the req/res cycle ends; so let's put back the custom one at the top bec. global middlewares are usu. defined before all our route handlers;
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
// POSTMAN ===> GET: 127.0.0.1:3000/api/v1/tours/2
// TERMINAL ===> Hello from the middleware 😀
//              { id: '2' }

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',

//     results: tours.length,
//     data: {
//       // tours: tours
//       // tours: x
//       tours,
//     },
//   });
// });

// app.get('/api/v1/tours/:id', getTour);
// app.get('/api/v1/tours/:id', (req, res) => {
//   // app.get('/api/v1/tours/:id/:x/:y?', (req, res) => {

//   console.log(req.params);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
