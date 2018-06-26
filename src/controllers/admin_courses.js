import models from './../database/models/index';

const { Op } = models.Sequelize;
export default (req, res) => {
  models.Bookings.findAll({
    include: [{
      model: models.EventCourses,
      where: { fees: { [Op.ne]: null } },
    },
    {
      model: models.Rooms,
    }],
  })
    .then(result => res.render('admin_courses', {
      pageTitle: 'admin Courses',
      layout: 'admin',
      courses: result,
      jsFile: ['admin'],
    }));
};
