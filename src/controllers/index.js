import express from 'express';
import home from './home';
import login from './login';
import events from './events';
import { phoneVerifyCheck, phoneVerifyStart } from './api/phone_verification';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events)
  .post('/api/v1/phone/verification/start', phoneVerifyStart)
  .post('/api/v1/phone/verification/check', phoneVerifyCheck)

export default router;
