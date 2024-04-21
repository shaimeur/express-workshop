const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 2670;
const host = '127.0.0.1';
const app = require('./index');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(err, 'Database connection failed');
  });

console.log(app.get('env'));
// console.log(process.env.USERNAM);

app.listen(port, host, () => {
  console.log(`server is listening to http://${host}:${port}`);
});
