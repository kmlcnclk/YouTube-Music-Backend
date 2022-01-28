const MixedModel = require('../../databases/models/MixedModel');
const CustomError = require('../../errors/CustomError');
const expressAsyncHandler = require('express-async-handler');

const isImageExist = (req, res, next) => {
  const { file } = req;
  if (!file) {
    return next(new CustomError('Image field is required', 400));
  }

  next();
};

const isFieldsExist = (req, res, next) => {
  const { name, artists } = req.body;

  if (!name) {
    return next(new CustomError('Name field is required', 400));
  }

  if (name != 'Your Likes') {
    if (!artists) {
      return next(new CustomError('Artists field is required', 400));
    }
  }

  next();
};

const isNameAlreadyExists = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const mixed = await MixedModel.findOne({ name });

  if (mixed) {
    return next(new CustomError('Name is already exists', 400));
  }
  next();
});

module.exports = {
  isImageExist,
  isFieldsExist,
  isNameAlreadyExists,
};
