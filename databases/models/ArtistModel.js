const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Artist name'],
  },
  kind: {
    type: String,
    default: 'Artist',
  },
  image_url: {
    type: String,
    required: [true, 'Please enter a image url'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  subscriberCount: {
    type: Number,
    default: 0,
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
ArtistSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

// Name Slug .For example kamilcan-celik
ArtistSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model('Artist', ArtistSchema);
