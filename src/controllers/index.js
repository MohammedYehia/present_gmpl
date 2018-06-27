import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';
import logout from './logout';
import events from './events';
import eventDetails from './eventDetails';
import checkId from './checkNumber';
import validLogin from './valid_login';
import adminEvents from './admin_events';
import adminCourses from './admin_courses';
import authintication from './authintication';
import adminHome from './admin_home';
import adminDeleteEvent from './admin_delete_event';


const router = express.Router();

router
  .get('/', home)
  .get('/events', events)
  .get('/courses', events)
  .get('/eventdetails/:id', checkId, eventDetails)
  .use('/admin', authintication)
  .get('/admin/login', getLogin)
  .get('/admin/logout', logout)
  .post('/admin/login', validLogin, postLogin)
  .get('/admin/events', adminEvents)
  .get('/admin/courses', adminCourses)
  .post('/admin/delete/courses/:id', adminDeleteEvent)
  .get('/admin/home', adminHome);

export default router;
