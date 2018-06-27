import models from './../database/models/index';

const { Op } = models.Sequelize;
export default (req, res) => {
  models.EventCourses.findAll({
    where: { fees: { [Op.ne]: null } },
  })
    .then((result) => {
      res.render('admin_courses', {
        pageTitle: 'admin Courses',
        layout: 'admin',
        courses: result,
        swal: true,
        jsFile: ['admin', 'admin_events_courses'],
      });
    });
};
