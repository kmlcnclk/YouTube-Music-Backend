const multer = require('multer');
const path = require('path');
const CustomError = require('../../errors/CustomError');
const { nanoid } = require('nanoid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == 'image') {
      const rootDir = path.dirname(require.main.filename);
      cb(null, path.join(rootDir, '/public/musics/images'));
    } else if (file.fieldname == 'music') {
      const rootDir = path.dirname(require.main.filename);
      cb(null, path.join(rootDir, '/public/musics/songs'));
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname == 'image') {
      const extension = file.mimetype.split('/')[1];
      let randomId = nanoid(30);
      req.savedMusicImage =
        'image_' + file.originalname + '_' + randomId + '.' + extension;
      cb(null, req.savedMusicImage);
    } else if (file.fieldname == 'music') {
      const originalName = file.originalname.split('.')[0];
      let randomId = nanoid(30);
      req.savedMusicSong = 'music_' + originalName + '_' + randomId + '.mp3';
      cb(null, req.savedMusicSong);
    }
  },
});

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

module.exports = { musicMulter };
