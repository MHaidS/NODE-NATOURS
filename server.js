// 67.6. so in the TERMINAL: 'npm i dotenv' & in 'server.js' & require this module;
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// 67.8. ... so these are the 4 variables that are defined in our file, 'config.env'; let's now go ahead & use the 'NODE_ENV' & 'PORT' variable; & to do that, we go into app.js;
// dotenv.config({ path: './config.env' });
// 67. Environment Variables

// console.log(app.get('env'));

// 67.4. now, it's not really practical to always define all of these variables in the command where we start the application esp. if you had like, say, 10 environment variables & it would not be really practical to write all of them out inside of the command; instead, what we'll do is create a configuration file, so 'config.env';

// console.log(process.env);

// ******* SERVER *******

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

// TERMINAL ===>
// Hello from the middleware 😀
// 2023-07-11T02:15:23.272Z

// 68. Setting up ESLint + Prettier in VS Code
// 68.1. cannot be installed globally; copy "devDependencies" fr package.json to NEW Project
// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev
// *************************
// "devDependencies": {
//   "eslint": "^8.44.0",
//   "eslint-config-airbnb": "^19.0.4",
//   "eslint-config-prettier": "^8.8.0",
//   "eslint-plugin-import": "^2.27.5",
//   "eslint-plugin-jsx-a11y": "^6.7.1",
//   "eslint-plugin-node": "^11.1.0",
//   "eslint-plugin-prettier": "^5.0.0",
//   "eslint-plugin-react": "^7.32.2",
//   "prettier": "^3.0.0"
// }
// 68.2. we also need files for prettier (already created previously) & eslint
// ===> .prettierrc
// ===> eslintrc.json

// 68.3. let's create some code that goes against some ES rules; ex., defining a variable & then assigning something else to it;
// const x = 23;
//  x = 66; ===> error message of "'x' is constant" disappears when this line is commented out
