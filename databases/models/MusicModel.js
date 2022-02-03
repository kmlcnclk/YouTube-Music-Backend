const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate-v2');

const MusicSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a music name'],
  },
  artists: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Artist',
      required: [true, 'Please enter a content'],
    },
  ],
  duration: {
    type: String,
    required: [true, 'Please enter a music duration'],
  },
  image_url: {
    type: String,
    required: [true, 'Please enter a image url'],
  },
  song_url: {
    type: String,
    required: [true, 'Please enter a song url'],
  },
  album_or_single: {
    type: mongoose.Schema.ObjectId,
    refPath: 'kind',
  },
  kind: {
    type: String,
    enum: ['Album', 'Single'],
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

MusicSchema.plugin(mongoosePaginate);

// Name Slug .For example kamilcan-celik
MusicSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

// Name Slug .For example kamilcan-celik
MusicSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model('Music', MusicSchema);
