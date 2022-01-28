const asyncHandler = require('express-async-handler');
const {
  populateHelper,
  paginationHelper,
} = require('./queryMiddlewareHelpers');
const MusicModel = require('../../databases/models/MusicModel');

// Music Query Middleware
const musicQueryMiddleware = function (options) {
  return asyncHandler(async (req, res, next) => {
    let query = MusicModel.find()
      .populate({
        path: 'artists',
        select: 'name',
      })
      .populate({
        path: 'album_or_single',
        select: 'name',
      });

    if (options && options.population) {
      query = populateHelper(query, options.population);
    }

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
};

module.exports = musicQueryMiddleware;
