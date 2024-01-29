const express = require('express');
const app = express();
const port = 2670;

app.listen(port, () => {
  console.log(`server is listening to ${port}....`);
});
