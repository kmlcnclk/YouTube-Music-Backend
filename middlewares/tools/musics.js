const CustomError = require('../../errors/CustomError');

const isMulterExist = (req, res, next) => {
  const { savedMusicImage, savedMusicSong } = req;
  if (!savedMusicImage) {
    return next(new CustomError('Image field is required', 400));
  }
  if (!savedMusicSong) {
    return next(new CustomError('Song field is required', 400));
  }

  next();
};

const isFieldsExist = (req, res, next) => {
  const { name, artists, duration, publicationYear, album_or_single, kind } =
    req.body;

  if (!name) {
    return next(new CustomError('Name field is required', 400));
  }

  if (!artists) {
    return next(new CustomError('Artists field is required', 400));
  }

  if (!duration) {
    return next(new CustomError('Music duration field is required', 400));
  }

  if (!publicationYear) {
    return next(new CustomError('Publication year field is required', 400));
  }

  if (!album_or_single) {
    return next(new CustomError('Album or Single field is required', 400));
  }

  if (!kind) {
    return next(new CustomError('Kind field is required', 400));
  }

  next();
};

module.exports = {
  isMulterExist,
  isFieldsExist,
};
