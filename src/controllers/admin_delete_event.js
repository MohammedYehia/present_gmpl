import models from './../database/models/index';

const { Op } = models.Sequelize;
export default (req, res) => {
  const courseId=req.params.id
  models.EventCourses.destroy({
    where: { id: 0 },
  }).then((result)=>{
    if (result===0) {
      res.send(JSON.stringify({ err: { errMsg: 'لا يمكن اتمام العمليه' } }));
    } else if(result===1) {
      res.status(200).send(JSON.stringify({ rediect: '/admin/courses' }));
    }
  });
};
