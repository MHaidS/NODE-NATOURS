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

// 63.40. so now, let's finish the process that we have here bec. we will no longer run 'nodemon app.js'; instead, we need to run 'server.js'; so let's create an npm script in 'package.json' under "scripts": so fr. ...
// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
// .... change it to ...
// "scripts": {
//   "start": "nodemon server.js"
// },
// ... this way, we no longer have to specify w/c file we actually want to run, we just have to write 'npm start'; this works even w/o having 'nodemon' installed as our dev dependency (npm i nodemon --save dev) since it has been installed globally previously (npm i nodemon --global); to check version of nodemon (nodemon -v); so now we have our app correctly refactored;
