const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ******* 1) MIDDLEWARES *******
app.use(morgan('dev'));
app.use(express.json());

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

//+++++++++++++++++++++++++++
