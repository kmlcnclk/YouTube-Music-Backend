const { Router } = require('express');
const {
  getSingleGenre,
  getAllGenres,
  genrePost,
  updateGenre,
  deleteGenre,
} = require('../controllers/genreController');
const { isFieldsExist } = require('../middlewares/tools/genres');

const genreRouter = Router();

// genreRouter.get('/single/:id', getSingleGenre);

genreRouter.get('/all', getAllGenres);

genreRouter.post('/create', [isFieldsExist], genrePost);

genreRouter.put('/update/:id', updateGenre);

genreRouter.delete('/delete/:id', deleteGenre);

module.exports = genreRouter;
