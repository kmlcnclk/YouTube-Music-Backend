const mongoose = require('mongoose');
const log = require('../tools/index');

// Connect Database
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('MongoDB Connection Successful');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;
