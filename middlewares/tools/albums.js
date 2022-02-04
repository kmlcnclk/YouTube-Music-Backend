const CustomError = require('../../errors/CustomError');

const isImageExist = (req, res, next) => {
  const { savedAlbumImage } = req;

  if (!savedAlbumImage) {
    return next(new CustomError('Image field is required', 400));
  }

  next();
};

const isFieldsExist = (req, res, next) => {
  const { name, description, publicationYear, artists } = req.body;

  if (!name) {
    return next(new CustomError('Name field is required', 400));
  }

  if (!description) {
    return next(new CustomError('Album description field is required', 400));
  }

  if (!artists) {
    return next(new CustomError('Album artists field is required', 400));
  }

  if (!publicationYear) {
    return next(new CustomError('Publication year field is required', 400));
  }

  next();
};

module.exports = {
  isImageExist,
  isFieldsExist,
};
