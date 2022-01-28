const expressAsyncHandler = require('express-async-handler');
const MixedModel = require('../databases/models/MixedModel');

const mixedGet = expressAsyncHandler(async (req, res) => {
  const mixeds = await MixedModel.find();

  res.status(200).json({
    success: true,
    data: mixeds,
  });
});

const mixedPost = expressAsyncHandler(async (req, res, next) => {
  const { name, artists } = req.body;
  const { URL } = process.env;

  const image_url = `${URL}/public/mixeds/${req.file.filename}`;

  const mixed = await MixedModel.create({
    name,
    artists,
    image_url,
  });

  return res.status(201).json({
    success: true,
    data: mixed,
  });
});

module.exports = {
  mixedGet,
  mixedPost,
};
