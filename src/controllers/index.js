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
import adminHome from './admin_home';
import adminRoom from './admin_room';

const controler = express.Router();

controler
  .get('/', home)
  .get('/events', events)
  .get('/courses', events)
  .get('/bookings', bookings)
  .post('/phone/verification/start', phoneVerifyStart)
  .get('/eventdetails/:id', checkId, eventDetails)
  
const adminControler = new express.Router();
  
adminControler
  .post('/login', validLogin, postLogin)
  .get('/logout', logout)
  .get('/home', adminHome)
  .get('/events', adminEvents)
  .get('/courses', adminCourses)
  .get('/room/:id', adminRoom);

export { controler, adminControler };
