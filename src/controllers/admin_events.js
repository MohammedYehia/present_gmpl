import models from './../database/models/index';

export default (req, res) => {
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
      jsFile: ['admin'],
    }));
};
