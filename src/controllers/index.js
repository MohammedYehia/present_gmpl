import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';
import logout from './logout';
import events from './events';
import bookings from './bookings';
import { phoneVerifyStart } from './phone_verification';
import eventDetails from './eventDetails';
import checkId from './checkNumber';
import validLogin from './valid_login';
import adminEvents from './admin_events';
import adminCourses from './admin_courses';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', getLogin)
  .post('/admin/login', validLogin, postLogin)
  .get('/admin/logout', logout)
  .get('/events', events)
  .get('/admin/events', adminEvents)
  .get('/admin/courses', adminCourses)
  .get('/courses', events)
  .get('/bookings', bookings)
  .post('/phone/verification/start', phoneVerifyStart)
  .get('/eventdetails/:id', checkId, eventDetails);

export default router;
