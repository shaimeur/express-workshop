require('dotenv').config();
const port = process.env.PORT || 2670;
const host = '127.0.0.1';
const app = require('./index');

console.log(app.get('env'));
// console.log(process.env.USERNAM);

app.listen(port, host, () => {
  console.log(`server is listening to http://${host}:${port}`);
});

const x = 66;

x = 0;
