const express = require('express');
const app = express();
const port = 2670;

app.get('/', (req, res) => {
  // sending basic response!!
  //   res.send('Hello from express!!');
  res.status(200).json({
    message: 'Hello from express server!!',
    username: 'shaimeur',
  });
});

app.post('/', (req, res) => {
  res.send('Post request have been made !!');
});

app.listen(port, () => {
  console.log(`server is listening to ${port}....`);
});
