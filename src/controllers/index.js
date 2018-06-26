import express from 'express';
import home from './home';
import login from './login';
import events from './events';
import bookings from './bookings';
import { phoneVerifyStart } from './phone_verification';
import eventDetails from './eventDetails';
import checkId from './checkNumber';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events)
  .get('/bookings', bookings)
  .post('/phone/verification/start', phoneVerifyStart)
  .get('/eventdetails/:id', checkId, eventDetails);

export default router;
