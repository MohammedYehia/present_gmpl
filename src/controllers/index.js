import express from 'express';
import home from './home';
import login from './login';
import events from './events';
import { getAdminPage, postEvent } from './adminAddEvent';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events)
  .get('/admin/addEventsPage', getAdminPage)
  .post('/admin/addevent', postEvent);

export default router;
