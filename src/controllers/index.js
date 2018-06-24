import express from 'express';
import home from './home';
import login from './login';
import events from './events';
import eventDetails from './eventDetails';
import check from './checkNumber';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events)
  .get('/eventdetails/:id', check, eventDetails);

export default router;
