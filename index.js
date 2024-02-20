const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 2670;

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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get All tours
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

// get one tour

const getOneTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((item) => item.id === id);
  // res.send('sended!');
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

// post one new tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// update a tour

const updateTour = (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((item) => item.id === id);
  // console.log(tour);
  // console.log(req.body);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  const updateTour = [...tours, Object.assign(tour, req.body)];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updateTour),
    (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        status: 'success',
        data: {
          updateTour,
        },
      });
    }
  );
};

// delete endpoint
const deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  const tour = tours.filter((item) => item.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tour),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// Our Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post('/api/v1/tours', createTour);
// app.put('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .put(updateTour)
  .get(getOneTour)
  .delete(deleteTour);

// getting data with streams and pipe :
// app.get('/api/v1/tours', (req, res) => {
//   const readeabale = fs.createReadStream('./dev-data/data/tours-simple.json');
//   readeabale.pipe(res.status(201));
// });

app.listen(port, () => {
  console.log(`server is listening to ${port}....`);
});
