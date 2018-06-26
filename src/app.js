import express from 'express';
import bodyParser from 'body-parser';
import exhbs from 'express-handlebars';
import path from 'path';
import favicon from 'serve-favicon';
import controllers from './controllers';
import clientsApi from './controllers/api/clients';
import helpers from './views/helpers/index';
import cookieParser from 'cookie-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

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
app.use('/api/v1', clientsApi)

app.use((req, res) => {
  res.status(404).render('error', {
    statusCode: 404,
    errorMessage: 'Page Not Found',
  });
});


app.use((err, req, res, next) => {
  if (err.isJoi) {
    res.status(401).send('Unauthorized');
  } else {
    res.status(500).render('error', {
      statusCode: 500,
      errorMessage: 'Internal server error',
    });
  }
});

export default app;
