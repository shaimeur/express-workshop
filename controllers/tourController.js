const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
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
  const updatedTour = [...tours, Object.assign(tour, req.body)];

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTour),
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

module.exports = {
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
  createTour,
};
