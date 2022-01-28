const multer = require('multer');
const path = require('path');
const CustomError = require('../../errors/CustomError');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, '/public/mixeds'));
  },
  filename: function (req, file, cb) {
    req.savedMixedImage = file.originalname;
    cb(null, req.savedMixedImage);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new CustomError('Please provide a valid image file', 400), false);
  }

  return cb(null, true);
};
const mixedImage = multer({ storage, fileFilter });

module.exports = { mixedImage };
