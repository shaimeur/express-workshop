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
  .then(() => {
    // console.log(con.connections);
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log(err, 'Database connection failed');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  rating: 4.7,
  price: 997,
});
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(app.get('env'));
// console.log(process.env.USERNAM);

app.listen(port, host, () => {
  console.log(`server is listening to http://${host}:${port}`);
});
