'use strict';

const mongoose = require('mongoose');
const slug = require('slug');

/**
 * Create a slug from the post title.
 * @param title
 * @returns {string}
 */
const slugify = title => {
  const date = Date.now();
  const titleSlug = slug(title);
  return `${titleSlug}-${date}`;
};

//Schema
const Schema = mongoose.Schema;

//Comment schema
const CommentSchema = new Schema({
  author: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
});

//Post schema
const PostSchema = new Schema({
  owner: {type: String, required: true},
  slug: {type: String},
  title: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
  comments: [CommentSchema]
});

/**
 * Post Pre-save, to save the created slug to the blog post.
 * Only change the slug when the title of the post has changed.
 */
PostSchema.pre('save', function (next) {
  const post = this;
  if (!post.isModified('title')) return next();
  post.slug = slugify(post.title);
  next();
});

/**
 * Update a Post record.
 */
PostSchema.method('update', function (updates, callback) {
  const post = this;
  Object.assign(post, updates, {updatedAt: Date.now()});
  post.save(callback);
});

//Post model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
