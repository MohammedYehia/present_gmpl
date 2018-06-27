import models from './../database/models/index';

const { Op } = models.Sequelize;
export default (req, res) => {
  const { params: { id: courseId } } = req;
  models.EventCourses.destroy({
    where: { id: courseId },
  }).then((result) => {
    if (result === 0) {
      res.send(JSON.stringify({ err: { errMsg: 'لا يمكن اتمام العمليه' } }));
    } else if (result === 1) {
      res.status(200).send(JSON.stringify({ rediect: '/admin/courses' }));
    }
  });
};
