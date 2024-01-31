const fs = require('fs');
const express = require('express');
const app = express();
const port = 2670;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
// getting data with streams and pipe :
// app.get('/api/v1/tours', (req, res) => {
//   const readeabale = fs.createReadStream('./dev-data/data/tours-simple.json');
//   readeabale.pipe(res);
// });

app.listen(port, () => {
  console.log(`server is listening to ${port}....`);
});
