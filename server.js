// 63.39. let us now import 'app.js' in 'server.js'; so 'const app =' then 'require' since this is our own module; we also need to use './' to say that we're in the current folder, then it's simply 'app'; later on, we will actually have other stuff in this file that is not related to express but still related to our application: stuff like database configurations or some error handling stuff or environment variables; all of these will live in this 'server.js' file, w/c is kind of our entry point;
const app = require('./app');

// ******* SERVER *******
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
