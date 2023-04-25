var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var userRouter = require('./routes/user');
var postRouter = require('./routes/post');
var replyRouter = require('./routes/reply');
var likeRouter = require('./routes/like');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/reply', replyRouter);
app.use('/api/like', likeRouter);

//url for connecting to MongoDB Atlas
const url = `mongodb+srv://username:password@cluster0.dvcg192.mongodb.net/SocialMediaApp?retryWrites=true&w=majority`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( err => {
        console.error(`Error connecting to the database. n${err}`);
    });



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
