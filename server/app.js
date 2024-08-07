var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require('cors')
const mongoose = require ('mongoose')
var usersRouter = require('./routes/user');
const blogRouter = require ('./routes/blog');
const passport = require ('./passport-config')
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config();

///-----CONNECTION TO DB-----///

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.DB_STRING_DEV;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('Connected to Database')
}
///---------------------------///



var app = express();
app.use(cors())
app.use(compression())
app.use(helmet())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog',blogRouter);
app.use('/user', usersRouter);

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
