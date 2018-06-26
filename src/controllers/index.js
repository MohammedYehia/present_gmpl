import express from 'express';
import home from './home';
import login from './login';
import events from './events';
import eventDetails from './eventDetails';
import checkId from './checkNumber';
import courseRegisteration from './courseRegisteration';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events)
  .get('/eventdetails/:id', checkId, eventDetails)
  .get('/register/:id', checkId, courseRegisteration);

export default router;
