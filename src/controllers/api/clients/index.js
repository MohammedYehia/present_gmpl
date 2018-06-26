import express from 'express';
import { getBookings, postBookings } from './get_bookings';
import getRooms from './get_rooms';
import { phoneVerifyCheck } from './../../phone_verification';
const router = express.Router();

router
  .get('/bookings', getBookings)
  .post('/bookings',phoneVerifyCheck, postBookings)
  .get('/rooms', getRooms)

export default router;