const { Router } = require('express');
const homePageRouter = require('./homePageRouter');
const musicRouter = require('./musicRouter');
const albumRouter = require('./albumRouter');
const singleRouter = require('./singleRouter');
const artistRouter = require('./artistRouter');
const explorePageRouter = require('./explorePageRouter');
const moodRouter = require('./moodRouter');
const genreRouter = require('./genreRouter');

const mainRouter = Router();

mainRouter.use('/homePage', homePageRouter);
mainRouter.use('/music', musicRouter);
mainRouter.use('/album', albumRouter);
mainRouter.use('/single', singleRouter);
mainRouter.use('/artist', artistRouter);
mainRouter.use('/explore', explorePageRouter);
mainRouter.use('/mood', moodRouter);
mainRouter.use('/genre', genreRouter);

module.exports = mainRouter;
