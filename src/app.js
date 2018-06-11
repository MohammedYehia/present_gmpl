const express = require('express');
const controllers = require('./controllers');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');
const helpers = require('./views/helpers/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
    helpers,
  }),
);
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

app.use(controllers);
module.exports = app;
