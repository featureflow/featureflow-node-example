const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Featureflow = require('featureflow-node-sdk');

const API_KEY = 'srv-env-ADD_API_KEY_HERE';


const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const config = {
    apiKey: API_KEY,
    withFeatures: [
        {
            key: 'node-demo-feature',
            failoverVariant:'off'
        }
    ]
};

let userMiddleware = function (req, res, next) {
    req.ffUser = new Featureflow.UserBuilder("jimmy@example.com")
        .withAttribute("firstName", "Jimmy")
        .withAttribute("lastName", "Hendrix")
        .withAttributes("hobbies", ["swimming", "skiing", "rowing"])
        .withAttribute("age", 32)
        .withAttribute("signupDate", new Date(2017, 10, 28))
        .withAttribute("ip", req.ip)
        .build();
    next();
};
app.use(userMiddleware);

let featureflowExpress = new Featureflow.ExpressClient(config);
app.use(featureflowExpress);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
