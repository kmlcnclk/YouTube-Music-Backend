const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const SingleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Single name'],
  },
  kind: {
    type: String,
    default: 'Single',
  },
  artists: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Artist',
    },
  ],
  image_url: {
    type: String,
    required: [true, 'Please enter a image url'],
  },
  description: {
    type: String,
    required: [true, 'Please enter a description'],
  },
  publicationYear: {
    type: Number,
    required: [true, 'Please enter a publication year'],
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
SingleSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

// Name Slug .For example kamilcan-celik
SingleSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model('Single', SingleSchema);
