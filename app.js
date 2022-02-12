const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mainRouter = require('./routers/mainRouter');
const customErrorHandler = require('./errors/customErrorHandler');
const connectDatabase = require('./databases/connectDatabase');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cloudinary = require('cloudinary');

dotenv.config({});

connectDatabase();

const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  origin: [
    'https://youtube-music-frontend.vercel.app',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YouTube Music API',
      version: '0.1.0',
      description:
        'YouTube Music API is a RESTful API that allows you to search for songs, playlists, and videos on YouTube.',
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
  },
  apis: ['./swaggers/*.js'],
};

const specs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(mainRouter);
app.use('/public', express.static(path.join(__dirname, 'public'), options));
app.use('*', (req, res) => {
  return res.status(404).send(
    `<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;">
      <h2 style="color:#333;font-family:sans-serif;">
        <strong>
          &#128550;
        </strong>
      </h2>
      <h2 style="color:#333;font-family:sans-serif;">
        <strong>
          404 Not Found
        </strong>
      </h2>
      <div style="background-color:#1aee30;cursor:pointer;padding:5px;border-radius:5px;width:170px;height:40px;display:flex;justify-content:center;align-items:center;" >
      <a href="${process.env.URL}/api-docs/" style="width:100%;height:100%;color:#f3f3f3;font-family:sans-serif;text-decoration:none;font-weight:600;display:flex;justify-content:center;align-items:center;">
      Click For Swagger UI
      </a>
      </div>
      </div>`
  );
});

app.use(customErrorHandler);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}/`));
