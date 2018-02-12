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

/**
 *Sort comments
 * returning - (negative) a will come before b
 * returning + (positive) b will come before a
 * returning 0 (zero) their positions will not be changed.
 * @param a
 * @param b
 * @returns {number}
 */
const sortComments = (a, b) => (b.updatedAt - a.updatedAt);

//Schema
const Schema = mongoose.Schema;

//Comment schema
const CommentSchema = new Schema({
  author: {type: String, required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
});

/**
 * Instance method to update the post comments.
 * body: Comment body
 */
CommentSchema.method('update', function (body, callback) {
  const comment = this;
  Object.assign(comment, {body: body}, {updatedAt: Date.now()});
  comment.parent().save(callback);
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
 * Also sort the comments depending on the updatedAt time.
 */
PostSchema.pre('save', function (next) {
  const post = this;
  if (!post.isModified('title')) return next();
  post.slug = slugify(post.title);
  post.comments.sort(sortComments);
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
