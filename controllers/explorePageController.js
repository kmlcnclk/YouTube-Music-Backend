const expressAsyncHandler = require('express-async-handler');
const { PaginationParameters } = require('mongoose-paginate-v2');
const AlbumModel = require('../databases/models/AlbumModel');
const SingleModel = require('../databases/models/SingleModel');

const exploreNewAlbumsAndSinglesGet = expressAsyncHandler(
  async (req, res, next) => {
    const options = {
      select: '_id name kind artists image_url slug created_date',
      sort: { created_date: -1 },
      populate: [
        {
          path: 'artists',
          select: 'name',
        },
      ],
      limit: 24,
      customLabels: {
        nextPage: 'next',
        prevPage: 'prev',
      },
    };

    let albumArray;
    await AlbumModel.paginate({}, options)
      .then((data) => {
        albumArray = data;
      })
      .catch((err) => {
        return next(new CustomError(err.message, 500));
      });

    let singleArray;
    await SingleModel.paginate({}, options)
      .then((data) => {
        singleArray = data;
      })
      .catch((err) => {
        return next(new CustomError(err.message, 500));
      });

    let total = [...albumArray.docs, ...singleArray.docs];

    total.sort(function (a, b) {
      return b.created_date - a.created_date;
    });

    res.status(200).json({
      success: true,
      data: total,
    });
  }
);

module.exports = { exploreNewAlbumsAndSinglesGet };
