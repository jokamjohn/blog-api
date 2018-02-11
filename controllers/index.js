const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const postsRoutes = require('./post');
const Post = require('../models/post');

//Unprotected routes
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