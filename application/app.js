const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const handlebars = require("express-handlebars");

const port = 3000;

let app = express();

// intialize utilities
app.use(logger('dev'));
// declare json parsers BEFORE router intializaers
// or else results in req.body undefined values
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, 'public')));

const index_router = require('./routes/index'),
  post_image_router = require('./routes/post_image'),
  registration_router = require('./routes/register'),
  image_post_router = require('./routes/image_post'),
  login_router = require('./routes/login');

// initialize routes for pages

// initialize endpoints
app.use('/', index_router);
app.use('/post_image', post_image_router);
app.use('/register', registration_router);
app.use('/image_post', image_post_router);
app.use('/login', login_router);


// initialize template engine for app
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars ({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));


app.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const server = app.listen(port, function () {
  console.log("Listening on port 3000");
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    // boolean means [force], see in mongoose doc
    process.exit(1);
  });
});

module.exports = app;
