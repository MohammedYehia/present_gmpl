import models from './../database/models/index';

export default (req, res) => {
  const { params: { id } } = req;
  models.EventCourses.destroy({
    where: { id },
  }).then((result) => {
    if (result === 0) {
      res.send(JSON.stringify({ err: { errMsg: 'لا يمكن اتمام العمليه' } }));
    } else if (result === 1) {
      const url = `/admin/${req.url.split('/')[3]}`;
      res.status(200).send(JSON.stringify({ redirect: url }));
    }
  });
};
