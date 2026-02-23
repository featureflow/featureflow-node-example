const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Featureflow = require('featureflow-node-sdk');

const API_KEY = process.env.FEATUREFLOW_API_KEY || 'sdk-srv-env-ADD_API_KEY_HERE';

// Singleton client - initialised once, shared across all requests
const client = new Featureflow.Client({
    apiKey: API_KEY,
    withFeatures: [
        { key: 'node-demo-feature', failoverVariant: 'off' }
    ]
});

const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Attach featureflow client and current user to every request
app.use((req, res, next) => {
    req.featureflow = client;
    req.ffUser = new Featureflow.UserBuilder('jimmy@example.com')
        .withAttribute('firstName', 'Jimmy')
        .withAttribute('lastName', 'Hendrix')
        .withAttributes('hobbies', ['swimming', 'skiing', 'rowing'])
        .withAttribute('age', 32)
        .withAttribute('signupDate', new Date(2017, 10, 28))
        .withAttribute('ip', req.ip)
        .build();
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = { app, client };
