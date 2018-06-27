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

const controler = express.Router();

controler
  .get('/', home)
  .get('/events', events)
  .get('/admin/login', getLogin)
  .get('/courses', events)
  .get('/bookings', bookings)
  .post('/phone/verification/start', phoneVerifyStart)
  .get('/eventdetails/:id', checkId, eventDetails)
  
const adminControler = new express.Router();

adminControler
  .post('/login', validLogin, postLogin)
  .get('/logout', logout)
  .get('/events', adminEvents)
  .get('/courses', adminCourses)

export { controler, adminControler };
