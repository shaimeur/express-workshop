const express = require('express');
const morgan = require('morgan');
const exp = require('constants');
const app = express();
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
// middleware
app.use(morgan('dev'));
app.use(express.json());

// creating our ouwn middleware

app.use((req, res, next) => {
  console.log('hello from your own middleware!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// reading the tours-simple json file synchronouslly

// Our Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post('/api/v1/tours', createTour);
// app.put('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Tours Routes
// Mounting the routes

// User Routes

// getting data with streams and pipe :
// app.get('/api/v1/tours', (req, res) => {
//   const readeabale = fs.createReadStream('./dev-data/data/tours-simple.json');
//   readeabale.pipe(res.status(201));
// });
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
