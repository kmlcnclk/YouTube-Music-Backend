const { Router } = require('express');
const {
  singlePost,
  getSingleSingle,
  deleteSingle,
  updateSingle,
} = require('../controllers/singleController');
const {
  singleImage,
  uploadImage,
} = require('../middlewares/libraries/singleImage');
const { isImageExist, isFieldsExist } = require('../middlewares/tools/singles');

const singleRouter = Router();

singleRouter.get('/single/:id', getSingleSingle);

singleRouter.post(
  '/create',
  [singleImage.single('image'), uploadImage, isImageExist, isFieldsExist],
  singlePost
);

singleRouter.put(
  '/update/:id',
  [singleImage.single('image'), uploadImage],
  updateSingle
);

singleRouter.delete('/delete/:id', deleteSingle);

module.exports = singleRouter;
