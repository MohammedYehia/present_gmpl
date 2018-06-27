import models from './../database/models/index';

export default (req, res, next) => {
  models.Bookings.findAll({
    include: [{
      model: models.EventCourses,
      where: { fees: null },
    },
    {
      model: models.Rooms,
    }],
  })
    .then(result => res.render('admin_events', {
      pageTitle: 'admin Events',
      layout: 'admin',
      events: result,
      swal: true,
      jsFile: ['admin', 'admin_events_courses'],
    })).catch((e) => {
      next(e);
    });
};
