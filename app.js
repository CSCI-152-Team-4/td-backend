var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()


//initialize app
var app = express();

//setup routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//setup public file storage
app.use('/files', express.static(path.join(__dirname + '/file')))

//Mongo Setup
var url = process.env.mongo_url

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch( (err) => {
    console.log("mongo error", err);
  })
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
