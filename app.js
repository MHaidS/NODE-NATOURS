const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ******* 1) MIDDLEWARES *******
// 67.9. in here, the PORT shd be defined & our logger middleware & what we want is to only run that middleware, to only define it when we are actually in development so that the login does not occur when the app is in production; .... 11.14 .... so we will only use 'morgan' if '(process.env.NODE_ENV === 'development')'; now you might be wondering why we have access to this environment variable 'process.env.NODE_ENV' when we didn't really define them in this file but in 'server.js' .....

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// TERMINAL ===>
// Hello from the middleware 😀
// 2023-07-11T02:32:04.510Z
// GET /api/v1/tours 200 7.317 ms - 8745

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 😀');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// const getUser = (req, res) => {
//   req.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// 63.10. take the userRouters & transfer to 'userRoutes.js'
// ******* ROUTES *******
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
