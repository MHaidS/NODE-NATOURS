const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// 64.6. let's create a new middleware function called 'checkId' & of course, we also need to export it; so 'checkID' & we have access to 'req', 'res', 'next' & again the 4th parameter will be the value of the parameter, 'val', since it is a 'param middleware'; now past the code we got fr 'deleteTour' inside the curly braces {} & don't forget to call 'next()' at the end of the middleware; what's also very impt. is that we have this 'return' stmt here, otherwise, express would send this 'res' back but it would still continue running the code in this function; & so after sending the response, it will still hit the 'next()' function & it would move on to the nxt middleware & will then send another response to the client; But that is not allowed, we're not allowed to send headers after the response had already been sent & so that's the kind of error that we would run into if we didn't have this 'return' stmt.:
// 'return res.status(404).json({
//   status: 'fail',
//   message: 'Invalid ID',
// })'
// ... so again, just make sure that after sending this response, the function will return so that it will finish & it will never call this 'next()'; so let's go ahead & remove this repeated code fr all of these other functions & replace w/ our newly created controller function;

exports.checkID = (req, res, next, val) => {
  // 64.10. transferred fr 'tourRoutes.js'; we want this code here just to make sure that the function's actually running;
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// 64.4. ..... here in our handler functions, we check if the id is valid & we do it in 'getTour', 'updateTour' & 'deleteTour'; so all these 3 functions have this very similar code where the id is checked if valid & if not, an invalid id response is sent back; as you already know, it is not a good practice to repeat code & what we can do here is to use the concept of param middleware & perform this check in an outside middleware that it's gping to run before the rqst even hits these handler functions;
// ******* ROUTE HANDLERS/CONTROLLERS *******
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',

    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  // 64.7. remove repeated code
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  // 64.8. remove repeated code
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // 64.5. so let's go ahead & get this code fr here & create a new middleware function called 'checkId' & of course, we also need to export it
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
