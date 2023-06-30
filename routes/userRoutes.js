// 63.32. transfer these handlers into the the 'userController.js' file;

// 63. A BETTER FILE STRUCTURE
// 63.1. let's create a new folder called 'routes' & in there, create files for 'tourRoutes.js' & 'userRoutes.js';

// 63.10. we also need to import the express module since we're using that variable
const express = require('express');

// 63.34. ... now let's import the user controllers/functions fr 'userController.js'...
const userController = require('./../controllers/userController');

// 63.13. functions/route handlers for 'users' transferred fr app.js;
// 63.32. transfer these handlers into the the 'userController.js' file;
// ------------------------------------------
// *******  ROUTE HANDLERS/CONTROLLERS *******
// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const createUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const getUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const updateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };

// const deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not yet defined',
//   });
// };
// -------------------------------------------------

// 63.9. take the userRouters fr app.js & paste them here in 'userRoutes.js' then change 'userRouters' to just 'router' since this is the convention; so let's now export the 'router' & then import in our main application later
// const userRouter = express.Router();
const router = express.Router();

// userRouter.route('/').get(getAllUsers).post(createUsers);
// 63.35. ... & finally, modify the routers by adding 'userController.'
// router.route('/').get(getAllUsers).post(createUsers);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);

// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
// router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// 63.11. when we only have 1 thing to export, we use 'module.exports' equal to 'router'; save & errors are still recvd since this is not yet defined in our main applic. later; what's also not defined here are the functions/route handlers on this file; copy fr app.js & paste them here;
module.exports = router;
