const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// ******* 1) MIDDLEWARES *******
// 67.9. in here, the PORT shd be defined & our logger middleware & what we want is to only run that middleware, to only define it when we are actually in development so that the login does not occur when the app is in production; .... 11.14 .... so we will only use 'morgan' if '(process.env.NODE_ENV === 'development')'; now you might be wondering why we have access to this environment variable 'process.env.NODE_ENV' when we didn't really define them in this file but in 'server.js' .....
// 67.10. ... & the answer to that is that the reading of the variables fr the file './config.env', w/c happens in 'server.js', to the Node process 'dotenv.config({ path: './config.env' })' only needs to happen once; so we're always in the same process no matter in what file we are & the environment variables are on the process; & so the process that is running, where our application is running is always the same & so this is available to us in every single file in the project; so this is how we use this variable; now let's go to 'server.js'...
// 67.12. ... let's do a console.log but we get 'undefined' in the TERMINAL; let's check what's going on in 'server.js'....
// 67.15. so this is how we run diff. codes depending whether we are in development or in production; so let's get rid of the code below 'console.log(process.env.NODE_ENV);'; let's go back to TERMINAL & 'npm run start:dev' then make 1 more http rqst in Postman & indeed here is our login result in the TERMINAL; so that's it for environment variables;
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// TERMINAL ===>
// Hello from the middleware 😀
// 2023-07-11T02:32:04.510Z
// GET /api/v1/tours 200 7.317 ms - 8745

// app.use(morgan('dev'));
app.use(express.json());

// 66.3. .... so for each pc. that is part of the website, our server actually gets a separate rqst & you see that most of them get this '404' so that's why the links are broken on the web page simply bec Express cannot find them in this folder; But that's not the point here, what we wanted to show here is how we serve static files fr a folder & not fr a route; & that wraps up the basic intro to Express;
//

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
