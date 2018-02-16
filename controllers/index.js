const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const postsRoutes = require('./post');
const Post = require('../models/post');
const Utils = require('../helpers/utils');

//Unprotected routes

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
router.get('/posts/:slug', (req, res) => {
  console.log('slug',req.params.slug);
  return res.json(req.post);
});

/**
 * Get all posts in the database.
 */
router.get('/posts', (req, res, next) => {
  Post.find({})
      .sort({createdAt: -1})
      .exec()
      .then(posts => res.json(posts))
      .catch(err => next(err));
});

//application routes
router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);


module.exports = router;