export default (req, res) => {
  res.render('bookings', {
    jsFile: [
      'sweetalert.min',
      'verify_form',
      'bookings',
    ],
    jsLinks: [
      'jquery.min',
      'moment.min',
      'fullcalendar.min',
      'locale-all',
      'scheduler.min',
    ],
    styleLinks: [
      'fullcalendar.min',
      'scheduler.min',
    ],
  });
};
