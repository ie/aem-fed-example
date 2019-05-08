var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const executeHtlParser = require('./');

const chokidar = require('chokidar');

const watcher = chokidar.watch('test/', {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true,
  persistent: true
});

const rebuildHTL = () => {
  delete global.fullObj;
  executeHtlParser();
};

const log = console.log.bind(console);
// Add event listeners.
watcher
  .on('add', path => { log(`CHOKIDAR: File ${path} has been added`); rebuildHTL(); })
  .on('change', path => { log(`CHOKIDAR: File ${path} has been changed`); rebuildHTL(); })
  .on('unlink', path => { log(`CHOKIDAR: File ${path} has been removed`); rebuildHTL(); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
