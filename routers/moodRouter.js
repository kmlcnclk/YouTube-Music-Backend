const { Router } = require('express');
const {
  getSingleMood,
  getAllMoods,
  moodPost,
  updateMood,
  deleteMood,
} = require('../controllers/moodController');
const { isFieldsExist } = require('../middlewares/tools/moods');

const moodRouter = Router();

// moodRouter.get('/single/:id', getSingleMood);

moodRouter.get('/all', getAllMoods);

moodRouter.post('/create', [isFieldsExist], moodPost);

moodRouter.put('/update/:id', updateMood);

moodRouter.delete('/delete/:id', deleteMood);

module.exports = moodRouter;
