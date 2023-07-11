// 67.6. so in the TERMINAL: 'npm i dotenv' & in 'server.js' & require this module;
const dotenv = require('dotenv');
// 67.13. ... it turned out that the problem is that we required the ('./app') file before our environment variables so we need to move 'dotenv.config({ path: './config.env' });' before 'const app = require('./app');'... & only after that we want to run the code in the ('./app') file; again, we couldn't read the process variable inside 'app.js' bec. it wasn't configured yet; give it a save & the TERMINAL now shows 'development'; if we do our rqst now in the Postman, then we get our logger back in the TERMINAL;
dotenv.config({ path: './config.env' });
const app = require('./app');
// TERMINAL ===> 67.13
// Hello from the middleware 😀
// 2023-07-11T01:47:35.395Z
// GET /api/v1/tours 200 8.374 ms - 8745

// 67.7. here we can use the 'dotenv' variable, call 'config' on it & in there we just have to pass an obj. to specify the path where our configuration file is located; so what this command '({ path: './config.env' })' will now do is to read our variables fr the file & save them into Node.js environment variables; let's run 'npm start' & that shd. block all our environment variables to the console bec. of this line of code 'console.log(process.env)':
// TERMINAL ===>
// ...
// NODE_ENV: 'development',
// PORT: '8000',
// USERNAME: 'jonas',
// PASSWORD: '123456'
// 67.8. ... so these are the 4 variables that are defined in our file, 'config.env'; let's now go ahead & use the 'NODE_ENV' & 'PORT' variable; & to do that, we go into app.js;

// dotenv.config({ path: './config.env' });

// 67. Environment Variables
// 67.1. so Node.js or Express apps can run in diff environments & the most impt ones are the 'development environment' & the 'production environment'; but there are other environments that bigger teams might use like diff databases or login turned on or off that will be based on environment variables; by default, Express sets the environment to 'development w/c makes a lot of sense bec. that's what we're doing when we start a new project; so for the sake of demonstration, let's take a look at that variable & we're going to do it here in the server; remember that everything that is not related to Express, it's going to be done outside of app.js; so we only use 'server.js' in order to configure the application, everything that has to do w/ the Express application; But the 'environment variables are really outside the scope of Express; let's log on the console (app.get('env')) & in the TERMINAL, you will see 'development'; so that is the environment that we're currently in & (app.get('env')) will get us the 'env' environment variable; in summary, 'environment variables' are global variables that are used to define the environment in w/c a node app is running;
// console.log(app.get('env'));

// 67.2. so 'env' in (app.get('env')) is set by Express but Node.js itself actually sets a lot of environment variables so let's take a look at those as well; so these ones are located at (process.env); give it a save & in the TERMINAL, it shows a lot of diff. variables & node uses most of them internally; for ex.. a task to current working directory 'PWD: '/Users/marizzehaideesalanga/Documents/UDEMY-Jonas/Node Express MongoDB&More/SEC6/NODE-NATOURS'' in this environment variable; my home folder 'HOME: '/Users/marizzehaideesalanga'', my login name 'LOGNAME: 'marizzehaideesalanga'' or the script that is used to start this process 'npm_lifecycle_script: 'nodemon server.js'', so stuff that for some reason, Node.js needs internally; now these variables come fr the 'process core module' & we're set at the moment that the process has started; as you see, we didn't have to require the process module, it is simply available everywhere automatically; in Express, many packages depend on a special variable called 'NODE_ENV'; it's a variable that's kind of a convention w/c shd define whether we're in 'development' or in 'production' mode; however, Express does not really define this variable so we have to do that manually & there are multiple ways to do it; but let's start w/ the easiest one w/c is to use the TERMINAL; so we used 'npm start' when we started the process previously, w/c stands for 'nodemon server.js'; so let's use it to start the process in the TERMINAL; but if you want to set an environment variable for this process, we need to add this variable to this command; so we start this process in the TERMINAL: 'NODE_ENV=development nodemon server.js' & rt. now, we have here 'NODE_ENV: 'development''; so this is the result of doing 'console.log(process.env)' & the variable 'NODE_ENV' actually comes fr that command; & we can actually define even more if we wanted, let's say 'X=23' for testing purposes, so let's start the process using 'NODE_ENV=development X=23 nodemon server.js' & now you see the 'X' environment variable set to this '23' string 'X: '23''; many packages on npm that we use for Express development actually depend on this environment variable....

// 67.3. so when our project is ready to be deployed, we shd then change the 'NODE_ENV' variable to 'production'; so we set 'NODE_ENV' & 'X' as environment variables but we can do a lot more & that's bec. we usu. use environment variables like configuration settings for our applications; so whenever our app needs some configuration for stuff that might change bases on the environment that the app is running in, we use the environment variables; for ex., we might use diff. databases for development & for testing until we could define 1 variable for each & then activate the right database accdg. to the environment; we could also set sensitive data like passwords & usernames using environment variables;

// 67.4. now, it's not really practical to always define all of these variables in the command where we start the application esp. if you had like, say, 10 environment variables & it would not be really practical to write all of them out inside of the command; instead, what we'll do is create a configuration file, so 'config.env';

// 67.5. & so '_ENV' is the convention for defining a file w/c are these environment variables & VSCode actually recognizes that based on the configuration icon in the file; so let's now define the variable 'NODE_ENV=development' in 'config.env' & we can also use sensitive data like USER is 'jonas' in lowercase & the PASSWORD is '123456'; Now, the variable names are usu. in uppercase so that's also some kind of a convention that we use; you may also notice in the VSCode that all text is white so you have no syntax highlighting; to solve this, you may install the 'DotENV' extension; let's also define the port on w/c our app shd be running & set it to '8000'; now how do we connect this '.env' file to our node application? so we need some way of reading these variables fr this file & then saving them as environment variables bec. right now, this is just a text file & Node.js has no way of knowing that these variables are in here; & for that, the std is to use an npm package called 'dotenv';

// console.log(process.env);

// ******* SERVER *******
// 67.11. ... let's say that the port shd either be the one coming fr the environment variables or this '3000'; let's do an http rqst in Postman to see if our logger works but now our login is gone ...
const port = process.env.PORT || 3000;

// const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

// 67.14. finally, as the last test, let's add a new "start" script to our package.json; so right now, we have:
// "scripts": {
//   "start": "nodemon server.js"
// },
// ... but let's add another one for production just so we can test what happens in that situation; let's call it "start:prod" while the other one is "start:dev";
// "scripts": {
//   "start:dev": "nodemon server.js",
//   "start:prod": "NODE_ENV=production nodemon server.js"
// },
// ... 'npm run start:prod' in the TERMINAL & the outcome shows that our  is set to 'production' & that is coming fr 'console.log(process.env.NODE_ENV);' in app.js; & if we now do the http rqst in Postman, we will not get our logger unlike before in 67.13.
// TERMINAL ===>
// Hello from the middleware 😀
// 2023-07-11T02:15:23.272Z
