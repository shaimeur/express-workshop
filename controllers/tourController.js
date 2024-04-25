const fs = require('fs');
const Tour = require('../models/tourModel');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// checkBody Middleware

const checkBody = (req, res, next) => {
  const { name, price } = req.body;
  // console.log(name);
  // console.log(price);
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// param middleware

const checkId = (req, res, next, val) => {
  console.log(`the current id is ${val}`);
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};
// get All tours
const getAllTours = async (req, res) => {
  // console.log(req.requestTime);
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      count: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// get one tour

const getOneTour = async (req, res) => {
  // const id = +req.params.id;
  // const tour = tours.find((item) => item.id === id);
  // res.send('sended!');

  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

// post one new tour
const createTour = async (req, res) => {
  try {
    const { name, rating, price } = req.body;

    const newTour = {
      name,
      rating,
      price,
    };
    console.log(newTour);

    const createdTour = await Tour.create(newTour);

    res.status(201).json({
      status: 'success',
      data: {
        message: 'tour created succeffuly !!',
        createdTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }

  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
};

// update a tour

const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, rating, price } = req.body;
    const newUpdatedTour = {
      name,
      rating,
      price,
    };

    const updatedTour = await Tour.findByIdAndUpdate(id, newUpdatedTour, {
      new: true,
    });
    res.status(200).json({
      status: 'succes',
      data: {
        updatedTour: updatedTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }

  // const id = +req.params.id;

  // const tour = tours.find((item) => item.id === id);
  // // console.log(tour);
  // // console.log(req.body);

  // const updatedTour = [...tours, Object.assign(tour, req.body)];

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(updatedTour),
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         updateTour,
  //       },
  //     });
  //   },
  // );
};

// delete endpoint
const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id);

    const deletedTour = await Tour.findByIdAndDelete({ _id: id });
    // if (!deletedTour) {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'tour not found!!',
    //   });
    // }
    console.log('====>', deletedTour);
    res.status(200).json({
      status: 'success',
      message: 'Tour deleted with success !!',
      deletedTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }

  // const id = +req.params.id;

  // const tour = tours.filter((item) => item.id !== id);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tour),
  //   (err) => {
  //     res.status(204).json({
  //       status: 'success',
  //       data: null,
  //     });
  //   },
  // );
};

module.exports = {
  deleteTour,
  getAllTours,
  getOneTour,
  updateTour,
  createTour,
  checkId,
  checkBody,
};
