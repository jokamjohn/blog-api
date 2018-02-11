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
 * Route to return a Post with a given slug.
 */
router.get('/:slug', (req, res, next) => {
  if ((req.post.owner === req.decode.userId) || req.decode.admin === true) return res.json(req.post);
  return next(Utils.Error('Action Forbidden', 403));
});

/**
 * Route to create a blog post.
 * /posts
 */
router.post('/', (req, res, next) => {
  const post = new Post({
    title: req.body['title'],
    body: req.body['body'],
    owner: req.decode.userId
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
  if ((req.post.owner === req.decode.userId) || req.decode.admin === true) {
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
  if ((req.post.owner === req.decode.userId) || req.decode.admin === true) {
    req.post.remove(function (err) {
      if (err) return next(Utils.Error('Failed to delete post', 500));
      return res.status(200).send({message: 'Post deleted successfully'});
    })
  } else {
    return next(Utils.Error('Action Forbidden', 403));
  }
});

module.exports = router;