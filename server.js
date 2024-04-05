const port = 2670;
const host = '127.0.0.1';

const app = require('./index');
app.listen(port, host, () => {
  console.log(`server is listening to http://${host}:${port}`);
});
