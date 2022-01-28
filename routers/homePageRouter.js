const { Router } = require('express');
const { mixedGet, mixedPost } = require('../controllers/homePageController');
const { mixedImage } = require('../middlewares/libraries/mixedImage');
const {
  isImageExist,
  isFieldsExist,
  isNameAlreadyExists,
} = require('../middlewares/tools/mixed');

const homePageRouter = Router();

homePageRouter.get('/mixed', mixedGet);
homePageRouter.post(
  '/mixed',
  [
    mixedImage.single('image'),
    isImageExist,
    isFieldsExist,
    isNameAlreadyExists,
  ],
  mixedPost
);

module.exports = homePageRouter;
