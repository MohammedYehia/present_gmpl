import express from 'express';
import { getBookings, postBookings } from './bookings';
import { postCourse } from './courses';
import getRooms from './rooms';
import { phoneVerifyCheck } from './../../phone_verification';
import checkId from '../../checkNumber';

const router = express.Router();

router
  .get('/bookings', getBookings)
  .post('/bookings', phoneVerifyCheck, postBookings)
  .post('/course/:id', checkId, phoneVerifyCheck, postCourse)
  .get('/rooms', getRooms)

export default router;