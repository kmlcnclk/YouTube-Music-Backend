const expressAsyncHandler = require('express-async-handler');
const GenreModel = require('../databases/models/GenreModel');
const CustomError = require('../errors/CustomError');

const getSingleGenre = expressAsyncHandler(async (req, res, next) => {});

const getAllGenres = expressAsyncHandler(async (req, res, next) => {
  const options = {
    sort: { createdAt: -1 },
    customLabels: {
      nextPage: 'next',
      prevPage: 'prev',
    },
  };

  await GenreModel.paginate({}, options)
    .then((data) => {
      return res.status(200).json({
        success: true,
        data: data.docs,
      });
    })
    .catch((err) => {
      return next(new CustomError(err.message, 500));
    });
});

const genrePost = expressAsyncHandler(async (req, res, next) => {
  const { name, color } = req.body;

  const genre = await GenreModel.create({
    name,
    color,
  });

  return res.status(201).json({
    success: true,
    message: 'Genre successfully created',
  });
});

const updateGenre = expressAsyncHandler(async (req, res, next) => {
  const { name, color } = req.body;
  const { id } = req.params;

  const genre = await GenreModel.findById(id);

  if (!genre) {
    return next(new CustomError('Genre is not defined', 400));
  }

  if (name) {
    genre.name = await name;
  }

  if (color) {
    genre.color = await color;
  }

  if (name || color) {
    await genre.save();
  }

  return res.status(200).json({
    success: true,
    message: 'Genre successfully updated',
  });
});

const deleteGenre = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const genre = await GenreModel.findById(id);

  if (!genre) {
    return next(new CustomError('Genre is not defined', 400));
  }

  await GenreModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Genre successfully deleted',
  });
});

module.exports = {
  getSingleGenre,
  getAllGenres,
  genrePost,
  updateGenre,
  deleteGenre,
};
