const createError = require('http-errors');
const express = require('express');
const logger = require('morgan')
const mongoose = require ('mongoose')
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user')
const gitsRouter = require('./routes/git');
const app = express();
const cors = require('cors')
require('dotenv').config()

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/soc_agregator", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/api/git', gitsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
