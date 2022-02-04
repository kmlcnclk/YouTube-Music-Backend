const expressAsyncHandler = require('express-async-handler');
const AlbumModel = require('../databases/models/AlbumModel');
const MusicModel = require('../databases/models/MusicModel');
const CustomError = require('../errors/CustomError');

const albumPost = expressAsyncHandler(async (req, res, next) => {
  const { name, artists, description, publicationYear } = req.body;

  const { URL } = process.env;

  const image_url = `${URL}/public/albums/${req.savedAlbumImage}`;

  const album = await AlbumModel.create({
    name,
    artists,
    image_url,
    description,
    publicationYear,
  });

  return res.status(201).json({
    success: true,
    message: 'Album successfully created',
  });
});

const getSingleAlbum = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError('ID is not defined', 400));
  }

  const album = await AlbumModel.findById(id).populate({
    path: 'artists',
    select: 'name',
  });

  if (!album) {
    return next(new CustomError('Album is not defined', 400));
  }

  const musics = await MusicModel.find();
  let albumMusics = [];
  for (let i = 0; i < musics.length; i++) {
    const music = await MusicModel.findById(musics[i]);

    if (music.album_or_single.toString() == album._id.toString()) {
      await albumMusics.push(music);
    }
  }

  let first = [];
  let second = [];
  for (let i = 0; i < albumMusics.length; i++) {
    const e = albumMusics[i].duration.split(':');

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
    ...album._doc,
    musicCount: albumMusics.length,
    musics: albumMusics,
    totalDuration: t,
  };

  return res.status(200).json({ success: true, data: data });
});

const deleteAlbum = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const album = await AlbumModel.findById(id);

  if (!album) {
    return next(new CustomError('Album is not defined', 400));
  }

  const musics = await MusicModel.find();

  for (let i = 0; i < musics.length; i++) {
    if (musics[i].album_or_single.toString() == album._id.toString()) {
      await MusicModel.findByIdAndRemove(musics[i]._id);
    }
  }

  await AlbumModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Album successfully deleted',
  });
});

const updateAlbum = expressAsyncHandler(async (req, res, next) => {
  const { name, description, publicationYear, artists } = req.body;
  const { id } = req.params;

  const album = await AlbumModel.findById(id);

  if (!album) {
    return next(new CustomError('Album is not defined', 400));
  }

  const { URL } = process.env;

  let image_url;
  if (req.savedAlbumImage) {
    image_url = `${URL}/public/albums/${req.savedAlbumImage}`;
  }

  if (name) {
    album.name = await name;
  }

  if (description) {
    album.description = await description;
  }

  if (publicationYear) {
    album.publicationYear = await publicationYear;
  }

  if (artists) {
    album.artists = await artists;
  }

  if (req.savedAlbumImage) {
    album.image_url = await image_url;
  }

  await album.save();

  return res.status(200).json({
    success: true,
    message: 'Album successfully updated',
  });
});

module.exports = {
  albumPost,
  getSingleAlbum,
  deleteAlbum,
  updateAlbum,
};
