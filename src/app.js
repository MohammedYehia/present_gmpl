import express from 'express';
import bodyParser from 'body-parser';
import exhbs from 'express-handlebars';
import path from 'path';
import favicon from 'serve-favicon';
import controllers from './controllers';
import helpers from './views/helpers/index';

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

export default app;
