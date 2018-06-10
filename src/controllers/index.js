const express = require('express');

const router = express.Router();
const cookieParser = require('cookie-parser');

const home = require('./home');
const event = require('./event');
const about = require('./about');
const course = require('./course');
const bookRoom = require('./book_room');
const courseRegist = require('./course_regist');
const roomDetails = require('./room_details');

router.use(cookieParser());
router.get('/', home.get);
router.get('/about', about.get);
router.get('/event/:id', event.get);
router.get('/course/:id', course.get);
router.get('/roomdetails/:id', roomDetails.get);
router.get('/bookroom', bookRoom.get);
router.post('/bookroom', bookRoom.post);
router.get('/courseregist/:id', courseRegist.get);
router.post('/courseregist/:id', courseRegist.post);
module.exports = router;
