import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';
import logout from './logout';
import events from './events';
import adminEvents from './admin_events';
import adminCourses from './admin_courses';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', getLogin)
  .post('/admin/login', postLogin)
  .get('/admin/logout', logout)
  .get('/events', events)
  .get('/admin/events', adminEvents)
  .get('/admin/courses', adminCourses);
export default router;
