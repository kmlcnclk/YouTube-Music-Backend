const multer = require('multer');
const CustomError = require('../../errors/CustomError');
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.fieldname == 'image') {
    let allowedMimeTypes = [
      'image/jpg',
      'image/png',
      'image/gif',
      'image/jpeg',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new CustomError('Please provide a valid image file', 400),
        false
      );
    }

    return cb(null, true);
  } else if (file.fieldname == 'music') {
    let allowedMimeTypes = ['audio/mpeg'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new CustomError('Please provide a valid song file', 400),
        false
      );
    }

    return cb(null, true);
  }
};

const musicMulter = multer({ storage, fileFilter });

const uploadImage = async (req, res, next) => {
  if (req.files.music[0].path) {
    try {
      await cloudinary.v2.uploader.upload(
        req.files.music[0].path,
        { resource_type: 'video' },
        async function (error, result) {
          req.savedMusicSong = await result;
        }
      );
    } catch (err) {
      return next(new CustomError(err.message, err.http_code));
    }
  }

  if (req.files.image[0].path) {
    try {
      const resultImage = await cloudinary.uploader.upload(
        req.files.image[0].path
      );
      req.savedMusicImage = await resultImage;
    } catch (err) {
      return next(new CustomError(err.message, err.http_code));
    }
  }

  next();
};

module.exports = { musicMulter, uploadImage };
