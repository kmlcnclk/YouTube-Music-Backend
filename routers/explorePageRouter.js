const { Router } = require('express');
const {
  exploreNewAlbumsAndSinglesGet,
} = require('../controllers/explorePageController');

const explorePageRouter = Router();

explorePageRouter.get(
  '/exploreNewAlbumsAndSinglesGet',
  exploreNewAlbumsAndSinglesGet
);

module.exports = explorePageRouter;
