const multer = require('multer');
const CustomError = require('../../errors/CustomError');
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError('Please provide a valid image file', 400), false);
  }

  return cb(null, true);
};

const albumImage = multer({ storage, fileFilter });

const uploadImage = async (req, res, next) => {
  if (req.file.path) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.savedAlbumImage = await result;
      next();
    } catch (err) {
      return next(new CustomError(err.message, 500));
    }
  }
};

module.exports = { albumImage, uploadImage };
