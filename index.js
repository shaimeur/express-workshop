const fs = require('fs');
const express = require('express');
const app = express();
const port = 2670;

// middleware
app.use(express.json());

// reading the tours-simple json file synchronouslly
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get All tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// get one tour
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// post one new tour
app.post('/api/v1/tours', (req, res) => {
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
});

// update a tour

app.put('/api/v1/tours/:id', (req, res) => {
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
});

// getting data with streams and pipe :
// app.get('/api/v1/tours', (req, res) => {
//   const readeabale = fs.createReadStream('./dev-data/data/tours-simple.json');
//   readeabale.pipe(res.status(201));
// });

app.listen(port, () => {
  console.log(`server is listening to ${port}....`);
});
