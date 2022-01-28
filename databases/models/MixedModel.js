const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const MixedSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a mixed name'],
    unique: [true, 'Name is already exists'],
  },
  artists: [
    {
      type: String,
      required: [true, 'Please enter a content'],
    },
  ],
  image_url: {
    type: String,
    required: [true, 'Please enter a image url'],
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
  },
});

// Name Slug .For example kamilcan-celik
MixedSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

// Name Slug .For example kamilcan-celik
MixedSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model('Mixed', MixedSchema);
