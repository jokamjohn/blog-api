'use strict';

const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const authMiddleware = require('../middlewares/auth');
const Utils = require('../helpers/utils');

//Auth middleware to protect these routes.
router.use(authMiddleware);

/**
 * Function to load the post document and attach it to the req.
 * It will be available whenever the url contains pID.
 * slug: Post slug
 */
router.param('slug', (req, res, next, slug) => {
  Post.findOne({slug: slug})
      .exec()
      .then(post => {
        if (!post) return next(Utils.Error('Not Found', 404));
        req.post = post;
        next();
      })
      .catch(err => next(err));
});

/**
 * Function to load the a comment onto the req
 * id : Is the comment Id (cId)
 */
router.param('cId', (req, res, next, id) => {
  req.comment = req.post.comments.id(id);
  if (!req.comment) return next(Utils.Error('Not Found', 404));
  return next();
});

/**
 * Route to create a blog post.
 * /posts
 */
router.post('/', (req, res, next) => {
  const post = new Post({
    title: req.body['title'],
    body: req.body['body'],
    owner: {
      id: req.decode.userId,
      name: req.decode.name,
      email: req.decode.email
    }
  });
  post.save()
      .then(() => res.status(201).send(post))
      .catch(err => next(err));
});

/**
 * Update a Post's records.
 * /posts/<slug>
 */
router.put('/:slug', (req, res, next) => {
  if ((req.post.owner.id === req.decode.userId) || req.decode.admin === true) {
    req.post.update(req.body, function (err, post) {
      if (err) return next(err);
      return res.json(post);
    });
  } else {
    return next(Utils.Error('Action Forbidden', 403));
  }
});

/**
 * Route to delete a Post.
 * /posts/<slug>
 */
router.delete('/:slug', (req, res, next) => {
  if ((req.post.owner.id === req.decode.userId) || req.decode.admin === true) {
    req.post.remove(function (err) {
      if (err) return next(Utils.Error('Failed to delete post', 500));
      return res.status(200).send({message: 'Post deleted successfully'});
    })
  } else {
    return next(Utils.Error('Action Forbidden', 403));
  }
});

//Comments routes

/**
 *Get all the comments for a given Post.
 */
router.get('/:slug/comments', (req, res) => {
  return res.json(req.post.comments);
});

/**
 * Route to add a comment to the post
 * /posts/:slug/comments
 */
router.post('/:slug/comments', (req, res, next) => {
  req.post.comments.push({
    author: {
      id: req.decode.userId,
      name: req.decode.name,
      email: req.decode.email
    },
    body: req.body['body']
  });
  req.post.save()
      .then(post => res.status(201).send(post))
      .catch(err => next(err));
});

/**
 * Route to update a comment.
 * Only the admin, post owner or comment author should be able to edit the comment.
 */
router.put('/:slug/comments/:cId', (req, res, next) => {
  if (req.decode.admin === true || req.decode.userId === req.comment.author.id || req.post.owner.id === req.decode.userId) {
    req.comment.update(req.body['body'], function (err, post) {
      if (err) return next(err);
      return res.json(post);
    })
  } else {
    return next(Utils.Error('Action Forbidden', 403));
  }
});

/**
 * Route to delete a comment.
 * Only the admin, post owner or comment author should be able to delete a comment.
 */
router.delete('/:slug/comments/:cId', (req, res, next) => {
  if (req.decode.admin === true || req.decode.userId === req.comment.author.id || req.post.owner.id === req.decode.userId) {
    req.comment.remove(function (err) {
      if (err) return next(Utils.Error('Failed to delete comment', 500));
      req.post.save()
          .then(post => res.json(post))
          .catch(err => next(err));
    })
  } else {
    return next(Utils.Error('Action Forbidden', 403));
  }
});

module.exports = router;