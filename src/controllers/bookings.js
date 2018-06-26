export default (req, res) => {
  res.render('bookings', {
    jsFile: [
      'verify_form',
      'bookings'
    ],
    jsLinks: [
      'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/locale-all.js',
      'https://fullcalendar.io/releases/fullcalendar-scheduler/1.9.4/scheduler.min.js'
    ],
    styleLinks: [
      'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css',
      'https://fullcalendar.io/releases/fullcalendar-scheduler/1.9.4/scheduler.min.css'
    ]
  })
};