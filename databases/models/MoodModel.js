const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate-v2');

const MoodSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Mood name'],
  },
  color: {
    type: String,
    required: [true, 'Please enter a color'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
  },
});

MoodSchema.plugin(mongoosePaginate);

// Name Slug .For example kamilcan-celik
MoodSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

// Name Slug .For example kamilcan-celik
MoodSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model('Mood', MoodSchema);
