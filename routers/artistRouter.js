const { Router } = require('express');
const {
  artistPost,
  getSingleArtist,
  deleteArtist,
  updateArtist,
} = require('../controllers/artistController');
const {
  artistImage,
  uploadImage,
} = require('../middlewares/libraries/artistImage');
const { isImageExist, isFieldsExist } = require('../middlewares/tools/artists');

const artistRouter = Router();

artistRouter.get('/single/:id', getSingleArtist);

artistRouter.post(
  '/create',
  [artistImage.single('image'), uploadImage, isImageExist, isFieldsExist],
  artistPost
);

artistRouter.put(
  '/update/:id',
  [artistImage.single('image'), uploadImage],
  updateArtist
);

artistRouter.delete('/delete/:id', deleteArtist);

module.exports = artistRouter;
