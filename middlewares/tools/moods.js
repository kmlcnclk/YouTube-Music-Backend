const CustomError = require('../../errors/CustomError');

const isFieldsExist = (req, res, next) => {
  const { name, color } = req.body;

  if (!name) {
    return next(new CustomError('Name field is required', 400));
  }

  if (!color) {
    return next(new CustomError('Color field is required', 400));
  }

  next();
};

module.exports = {
  isFieldsExist,
};
