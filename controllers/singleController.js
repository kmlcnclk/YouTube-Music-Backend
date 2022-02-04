const expressAsyncHandler = require('express-async-handler');
const MusicModel = require('../databases/models/MusicModel');
const SingleModel = require('../databases/models/SingleModel');
const CustomError = require('../errors/CustomError');

const singlePost = expressAsyncHandler(async (req, res, next) => {
  const { name, artists, description, publicationYear } = req.body;

  const { URL } = process.env;

  const image_url = `${URL}/public/singles/${req.savedSingleImage}`;

  const single = await SingleModel.create({
    name,
    artists,
    image_url,
    description: description ? description : '',
    publicationYear,
  });

  return res.status(201).json({
    success: true,
    message: 'Single successfully created',
  });
});

const getSingleSingle = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError('ID is not defined', 400));
  }

  const single = await SingleModel.findById(id).populate({
    path: 'artists',
    select: 'name',
  });

  if (!single) {
    return next(new CustomError('Single is not defined', 400));
  }

  const musics = await MusicModel.find();
  let singleMusics = [];
  for (let i = 0; i < musics.length; i++) {
    const music = await MusicModel.findById(musics[i]);

    if (music.album_or_single.toString() == single._id.toString()) {
      await singleMusics.push(music);
    }
  }

  let first = [];
  let second = [];
  for (let i = 0; i < singleMusics.length; i++) {
    const e = singleMusics[i].duration.split(':');

    await first.push(Number(e[0]));
    await second.push(Number(e[1]));
  }

  let total_first = 0;
  let total_second = 0;

  for (let i = 0; i < first.length; i++) {
    total_first += first[i];
  }

  for (let i = 0; i < second.length; i++) {
    total_second += second[i];
  }

  if (total_second >= 60) {
    let a = total_second / 60;

    total_first += parseInt(a);
  }

  const l = total_second % 60;

  let t;
  if (l < 10) {
    t = total_first + ':' + '0' + l;
  } else {
    t = total_first + ':' + l;
  }

  const data = {
    ...single._doc,
    musicCount: singleMusics.length,
    musics: singleMusics,
    totalDuration: t,
  };

  return res.status(200).json({ success: true, data: data });
});

const deleteSingle = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const single = await SingleModel.findById(id);

  if (!single) {
    return next(new CustomError('Single is not defined', 400));
  }

  const musics = await MusicModel.find();

  for (let i = 0; i < musics.length; i++) {
    if (musics[i].album_or_single.toString() == single._id.toString()) {
      await MusicModel.findByIdAndRemove(musics[i]._id);
    }
  }

  await SingleModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Single successfully deleted',
  });
});

const updateSingle = expressAsyncHandler(async (req, res, next) => {
  const { name, description, publicationYear, artists } = req.body;
  const { id } = req.params;

  const single = await SingleModel.findById(id);

  if (!single) {
    return next(new CustomError('Single is not defined', 400));
  }

  const { URL } = process.env;

  let image_url;
  if (req.savedSingleImage) {
    image_url = `${URL}/public/singles/${req.savedSingleImage}`;
  }

  if (name) {
    single.name = await name;
  }

  if (description) {
    single.description = await description;
  }

  if (publicationYear) {
    single.publicationYear = await publicationYear;
  }

  if (artists) {
    single.artists = await artists;
  }

  if (req.savedSingleImage) {
    single.image_url = await image_url;
  }

  await single.save();

  return res.status(200).json({
    success: true,
    message: 'Single successfully updated',
  });
});

module.exports = {
  singlePost,
  getSingleSingle,
  deleteSingle,
  updateSingle,
};
