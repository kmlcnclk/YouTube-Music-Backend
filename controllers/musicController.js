const expressAsyncHandler = require('express-async-handler');
const MusicModel = require('../databases/models/MusicModel');
const CustomError = require('../errors/CustomError');
const { PaginationParameters } = require('mongoose-paginate-v2');

const musicPost = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    artists,
    duration,
    publicationYear,
    album_or_single,
    kind,
    lyrics,
    lyricSource,
  } = req.body;

  const { URL } = process.env;

  const image_url = `${URL}/public/musics/images/${req.savedMusicImage}`;
  const song_url = `${URL}/public/musics/songs/${req.savedMusicSong}`;

  const music = await MusicModel.create({
    name,
    artists,
    image_url,
    song_url,
    duration,
    publicationYear,
    album_or_single,
    kind,
    lyrics,
    lyricSource,
  });

  return res.status(201).json({
    success: true,
    message: 'Music successfully created',
  });
});

const getSingleMusic = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError('ID is not defined', 400));
  }

  const music = await MusicModel.findById(id)
    .populate({
      path: 'artists',
      select: 'name',
    })
    .populate({
      path: 'album_or_single',
      select: 'name',
    });

  if (!music) {
    return next(new CustomError('Music is not defined', 400));
  }

  return res.status(200).json({ success: true, data: music });
});

const updateMusic = expressAsyncHandler(async (req, res, next) => {
  const { name, artists, duration, publicationYear, album_or_single, kind } =
    req.body;
  const { id } = req.params;

  const music = await MusicModel.findById(id);

  const { URL } = process.env;

  let image_url;
  if (req.savedMusicImage) {
    image_url = `${URL}/public/musics/images/${req.savedMusicImage}`;
  }

  let song_url;
  if (req.savedMusicSong) {
    song_url = `${URL}/public/musics/songs/${req.savedMusicSong}`;
  }

  if (name) {
    music.name = await name;
  }

  if (artists) {
    music.artists = await artists;
  }

  if (duration) {
    music.duration = await duration;
  }

  if (publicationYear) {
    music.publicationYear = await publicationYear;
  }

  if (album_or_single) {
    music.album_or_single = await album_or_single;
  }

  if (kind) {
    music.kind = await kind;
  }

  if (req.savedMusicImage) {
    music.image_url = await image_url;
  }

  if (req.savedMusicSong) {
    music.song_url = await song_url;
  }

  await music.save();

  return res.status(200).json({
    success: true,
    message: 'Music successfully updated',
  });
});

const deleteMusic = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const music = await MusicModel.findById(id);

  if (!music) {
    return next(new CustomError('Music is not defined', 400));
  }

  await MusicModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Music successfully deleted',
  });
});

const get20Music = expressAsyncHandler(async (req, res, next) => {
  req.query.populate = await [
    {
      path: 'artists',
      select: 'name',
    },
    {
      path: 'album_or_single',
      select: 'name',
    },
  ];

  req.query.customLabels = await {
    nextPage: 'next',
    prevPage: 'prev',
    totalDocs: 'totalMusics',
    docs: 'musics',
  };

  MusicModel.paginate(...new PaginationParameters(req).get())
    .then((data) =>
      res.status(200).json({
        success: true,
        data: data,
      })
    )
    .catch((err) => next(new CustomError(err.message, 500)));
});

module.exports = {
  musicPost,
  getSingleMusic,
  updateMusic,
  deleteMusic,
  get20Music,
};
