'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const logger = require('morgan');
require('./models/db').Database;
const router = require('./controllers/index');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');

//app port
const port = process.env.PORT || 5000;

//setting app secret
app.set('secret', process.env.SECRET || 'fhdbsjnkcmlknjbhvgcfdxcvhjbkn');

//app middleware
app.use(logger('dev'));
app.use(jsonParser());
app.use(cors);


//routes
app.use('/api/v1', router);

//app error middleware
app.use(errorHandler.catch404);
app.use(errorHandler);

//start server
app.listen(port, () => console.log(`app running at port ${port}`));
