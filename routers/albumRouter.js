const { Router } = require('express');
const {
  albumPost,
  getSingleAlbum,
  deleteAlbum,
  updateAlbum,
} = require('../controllers/albumController');
const {
  albumImage,
  uploadImage,
} = require('../middlewares/libraries/albumImage');
const { isImageExist, isFieldsExist } = require('../middlewares/tools/albums');

const albumRouter = Router();

albumRouter.get('/single/:id', getSingleAlbum);

albumRouter.post(
  '/create',
  [albumImage.single('image'), uploadImage, isImageExist, isFieldsExist],
  albumPost
);

albumRouter.put(
  '/update/:id',
  [albumImage.single('image'), uploadImage],
  updateAlbum
);

albumRouter.delete('/delete/:id', deleteAlbum);

module.exports = albumRouter;
