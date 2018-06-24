import models from '../database/models';

export default (req, res) => {
  models.EventCourses.findById(req.params.id).then((detail) => {
    res.render('eventDetails', { detail: detail.dataValues });
  });
};
