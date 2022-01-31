const {
  populateHelper,
  paginationHelper,
} = require('./queryMiddlewareHelpers');
const MusicModel = require('../../databases/models/MusicModel');
const expressAsyncHandler = require('express-async-handler');

// Music Query Middleware
const musicQueryMiddleware = expressAsyncHandler(async (req, res, next) => {
  let query = MusicModel.find()
    .populate({
      path: 'artists',
      select: 'name',
    })
    .populate({
      path: 'album_or_single',
      select: 'name',
    });

  const total = await MusicModel.countDocuments();
  const paginationResult = await paginationHelper(total, 20, query, req);

  query = paginationResult.query;
  const pagination = paginationResult.pagination;

  const queryResults = {
    musics: await query,
    pagination: await pagination,
  };

  res.queryResults = {
    success: true,
    data: queryResults,
  };
  next();
});

module.exports = musicQueryMiddleware;
