const { Router } = require('express');
const {
  musicPost,
  getSingleMusic,
  updateMusic,
  deleteMusic,
  get20Music,
} = require('../controllers/musicController');
const { musicMulter } = require('../middlewares/libraries/musicMulter');
const { isMulterExist, isFieldsExist } = require('../middlewares/tools/musics');

const musicRouter = Router();

musicRouter.get('/get20Music', get20Music);

musicRouter.get('/single/:id', getSingleMusic);

musicRouter.post(
  '/',
  [
    musicMulter.fields([
      { name: 'image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
    isMulterExist,
    isFieldsExist,
  ],
  musicPost
);

musicRouter.put(
  '/update/:id',
  [
    musicMulter.fields([
      { name: 'image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
  ],
  updateMusic
);
musicRouter.delete('/delete/:id', deleteMusic);

module.exports = musicRouter;
