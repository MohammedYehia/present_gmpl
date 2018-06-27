import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';
import logout from './logout';
import events from './events';
import bookings from './bookings';
import { phoneVerifyStart } from './phone_verification';
import { getAdminPage, postEvent } from './adminAddEvent';
import { getAddCoursePage, postCourse } from './adminAddCourse';
import eventDetails from './eventDetails';
import checkId from './checkNumber';
import validLogin from './valid_login';
import adminEvents from './admin_events';
import adminCourses from './admin_courses';
import adminHome from './admin_home';
import adminRoom from './admin_room';
import authintication from './authintication';
import { validateAddEvent, validateAddCourse } from './validate_course_event';
import adminDeleteEventsCourses from './admin_delete_events_courses';


const router = express.Router();

router
  .get('/', home)
  .get('/events', events)
  .get('/courses', events)
  .get('/bookings', bookings)
  .post('/phone/verification/start', phoneVerifyStart)
  .get('/eventdetails/:id', checkId, eventDetails)
  .use('/admin', authintication)
  .get('/admin/home', adminHome)
  .get('/admin/login', getLogin)
  .post('/admin/login', validLogin, postLogin)
  .get('/admin/logout', logout)
  .get('/admin/events', adminEvents)
  .get('/admin/courses', adminCourses)
  .get('/admin/room/:id', adminRoom)
  .get('/admin/addevent', getAdminPage)
  .post('/admin/addevent', validateAddEvent, postEvent)
  .get('/admin/addcourse', getAddCoursePage)
  .post('/admin/addcourse', validateAddCourse, postCourse)
  .post('/admin/delete/(|courses|events)/:id', adminDeleteEventsCourses);

export default router;
