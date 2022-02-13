const expressAsyncHandler = require('express-async-handler');
const MoodModel = require('../databases/models/MoodModel');
const CustomError = require('../errors/CustomError');

const getSingleMood = expressAsyncHandler(async (req, res, next) => {});

const getAllMoods = expressAsyncHandler(async (req, res, next) => {
  const options = {
    customLabels: {
      nextPage: 'next',
      prevPage: 'prev',
    },
  };

  await MoodModel.paginate({}, options)
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

const moodPost = expressAsyncHandler(async (req, res, next) => {
  const { name, color } = req.body;

  const mood = await MoodModel.create({
    name,
    color,
  });

  return res.status(201).json({
    success: true,
    message: 'Mood successfully created',
  });
});

const updateMood = expressAsyncHandler(async (req, res, next) => {
  const { name, color } = req.body;
  const { id } = req.params;

  const mood = await MoodModel.findById(id);

  if (!mood) {
    return next(new CustomError('Mood is not defined', 400));
  }

  if (name) {
    mood.name = await name;
  }

  if (color) {
    mood.color = await color;
  }

  if (name || color) {
    await mood.save();
  }

  return res.status(200).json({
    success: true,
    message: 'Mood successfully updated',
  });
});

const deleteMood = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const mood = await MoodModel.findById(id);

  if (!mood) {
    return next(new CustomError('Mood is not defined', 400));
  }

  await MoodModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Mood successfully deleted',
  });
});

module.exports = {
  getSingleMood,
  getAllMoods,
  moodPost,
  updateMood,
  deleteMood,
};
