const mongoose = require('mongoose');

// Connect Database
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connection Successful');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;
