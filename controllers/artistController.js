const expressAsyncHandler = require('express-async-handler');
const ArtistModel = require('../databases/models/ArtistModel');
const MusicModel = require('../databases/models/MusicModel');
const AlbumModel = require('../databases/models/AlbumModel');
const SingleModel = require('../databases/models/SingleModel');
const CustomError = require('../errors/CustomError');

const artistPost = expressAsyncHandler(async (req, res, next) => {
  const { name, description, subscriberCount } = req.body;

  const { URL } = process.env;

  const image_url = `${URL}/public/artists/${req.savedArtistImage}`;

  const artist = await ArtistModel.create({
    name,
    image_url,
    description,
    subscriberCount: subscriberCount ? subscriberCount : 0,
  });

  return res.status(201).json({
    success: true,
    message: 'Artist successfully created',
  });
});

const getSingleArtist = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError('ID is not defined', 400));
  }

  const artist = await ArtistModel.findById(id);

  if (!artist) {
    return next(new CustomError('Artist is not defined', 400));
  }

  const musics = await MusicModel.find();
  let artistMusics = [];
  for (let i = 0; i < musics.length; i++) {
    const music = await MusicModel.findById(musics[i]).populate({
      path: 'album_or_single',
      select: 'name',
    });

    for (let x = 0; x < music.artists.length; x++) {
      if (music.artists[x].toString() == artist._id.toString()) {
        await artistMusics.push(music);
      }
    }
  }

  const albums = await AlbumModel.find();
  let artistAlbums = [];
  for (let i = 0; i < albums.length; i++) {
    const album = await AlbumModel.findById(albums[i]);

    for (let x = 0; x < album.artists.length; x++) {
      if (album.artists[x].toString() == artist._id.toString()) {
        await artistAlbums.push(album);
      }
    }
  }

  const singles = await SingleModel.find();
  let artistSingles = [];
  for (let i = 0; i < singles.length; i++) {
    const single = await SingleModel.findById(singles[i]);

    for (let x = 0; x < single.artists.length; x++) {
      if (single.artists[x].toString() == artist._id.toString()) {
        await artistSingles.push(single);
      }
    }
  }

  const data = {
    ...artist._doc,
    musics: artistMusics,
    albums: artistAlbums,
    singles: artistSingles,
  };

  return res.status(200).json({ success: true, data: data });
});

const deleteArtist = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const artist = await ArtistModel.findById(id);

  if (!artist) {
    return next(new CustomError('Artist is not defined', 400));
  }

  const musics = await MusicModel.find();

  for (let i = 0; i < musics.length; i++) {
    const music = await MusicModel.findById(musics[i]);

    for (let x = 0; x < music.artists.length; x++) {
      if (music.artists[x].toString() == artist._id.toString()) {
        if (music.artists.length == 1) {
          await music.remove();
        } else if (music.artists.length > 1) {
          music.artists = await music.artists.filter(
            (aristID) => aristID.toString() != artist._id.toString()
          );
          await music.save();
        }
      }
    }
  }

  const albums = await AlbumModel.find();

  for (let i = 0; i < albums.length; i++) {
    const album = await AlbumModel.findById(albums[i]);

    for (let x = 0; x < album.artists.length; x++) {
      if (album.artists[x].toString() == artist._id.toString()) {
        if (album.artists.length == 1) {
          await album.remove();
        } else if (album.artists.length > 1) {
          album.artists = await album.artists.filter(
            (aristID) => aristID.toString() != artist._id.toString()
          );
          await album.save();
        }
      }
    }
  }

  const singles = await SingleModel.find();

  for (let i = 0; i < singles.length; i++) {
    const single = await SingleModel.findById(singles[i]);

    for (let x = 0; x < single.artists.length; x++) {
      if (single.artists[x].toString() == artist._id.toString()) {
        if (single.artists.length == 1) {
          await single.remove();
        } else if (single.artists.length > 1) {
          single.artists = await single.artists.filter(
            (aristID) => aristID.toString() != artist._id.toString()
          );
          await single.save();
        }
      }
    }
  }

  await ArtistModel.findByIdAndRemove(id);

  return res.status(200).json({
    success: true,
    message: 'Artist successfully deleted',
  });
});

const updateArtist = expressAsyncHandler(async (req, res, next) => {
  const { name, description, subscriberCount } = req.body;
  const { id } = req.params;

  const artist = await ArtistModel.findById(id);

  if (!artist) {
    return next(new CustomError('Artist is not defined', 400));
  }

  const { URL } = process.env;

  let image_url;
  if (req.savedArtistImage) {
    image_url = `${URL}/public/artists/${req.savedArtistImage}`;
  }

  if (name) {
    artist.name = await name;
  }

  if (description) {
    artist.description = await description;
  }

  if (subscriberCount) {
    artist.subscriberCount = await subscriberCount;
  }

  if (req.savedArtistImage) {
    artist.image_url = await image_url;
  }

  await artist.save();

  return res.status(200).json({
    success: true,
    message: 'Artist successfully updated',
  });
});

module.exports = {
  artistPost,
  getSingleArtist,
  deleteArtist,
  updateArtist,
};
