'use strict';

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

//Auth middleware
router.use(authMiddleware);



module.exports = router;