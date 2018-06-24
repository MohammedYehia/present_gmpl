import express from 'express';
import home from './home';
import login from './login';
import events from './events';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login)
  .get('/events', events)
  .get('/courses', events);

export default router;
