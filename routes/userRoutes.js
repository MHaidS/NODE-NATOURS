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

// -------------------------------------------------

// const userRouter = express.Router();
const router = express.Router();

// userRouter.route('/').get(getAllUsers).post(createUsers);

// router.route('/').get(getAllUsers).post(createUsers);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
