import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';
import logout from './logout';
import events from './events';
import eventDetails from './eventDetails';
import checkId from './checkNumber';
import validLogin from './valid_login';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', getLogin)
  .post('/admin/login',validLogin, postLogin)
  .get('/admin/logout', logout)
  .get('/events', events)
  .get('/courses', events)
  .get('/eventdetails/:id', checkId, eventDetails);

export default router;
