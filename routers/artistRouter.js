const { Router } = require('express');
const {
  artistPost,
  getSingleArtist,
  deleteArtist,
  updateArtist,
} = require('../controllers/artistController');
const { artistImage } = require('../middlewares/libraries/artistImage');
const { isImageExist, isFieldsExist } = require('../middlewares/tools/artists');

const artistRouter = Router();

artistRouter.get('/single/:id', getSingleArtist);

artistRouter.post(
  '/',
  [artistImage.single('image'), isImageExist, isFieldsExist],
  artistPost
);

artistRouter.put('/update/:id', [artistImage.single('image')], updateArtist);

artistRouter.delete('/delete/:id', deleteArtist);

module.exports = artistRouter;
