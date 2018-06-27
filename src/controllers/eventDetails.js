import models from '../database/models';

export default (req, res) => {
  models.EventCourses.findById(req.params.id).then((detail) => {
    const js = detail.dataValues.fees ? ['sweetalert.min', 'verify_form', 'event_details'] : null;
    if (!detail) {
      return res.status(404).render('error', {
        statusCode: 404,
        errorMessage: 'Page not found',
      });
    }
    return res.render('eventDetails', {
      detail: detail.dataValues,
      js,
    });
  });
};
