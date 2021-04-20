var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const handlebars = require("express-handlebars");

const port = 3000;

const index_router = require('./routes/index'),
  post_image_router = require('./routes/post_image'),
  registration_router = require('./routes/register'),
  image_post_router = require('./routes/image_post'),
  login_router = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/post_image', post_image_router);
app.use('/register', registration_router);
app.use('/image_post', image_post_router);
app.use('/login', login_router);

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars ({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

app.listen(port, function () {
  console.log("Listening on port 3000");
});
module.exports = app;
