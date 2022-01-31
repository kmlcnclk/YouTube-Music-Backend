const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mainRouter = require('./routers/mainRouter');
const customErrorHandler = require('./errors/customErrorHandler');
const connectDatabase = require('./databases/connectDatabase');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

dotenv.config({});

connectDatabase();

const PORT = process.env.PORT || 5000;

const app = express();

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['jpeg', 'png', 'gif', 'jpg'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  },
};
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(mainRouter);
app.use('/public', express.static(path.join(__dirname, 'public'), options));
app.use('*', (req, res) => {
  res.send('Not Found');
});
app.use(customErrorHandler);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}/`));
