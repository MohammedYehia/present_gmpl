import { getToken } from '../../create_token';
import models from '../../../database/models';


export const postCourse = (req, res) => {
  const courseId = req.params.id;
  const { token } = req.cookies;
  getToken(token,(getTokenErr, data) => {
    if (getTokenErr) {
      res.json({ err: 'Something went wrong try again' })
    } else {
      const {
        name,
        phone,
        email,
      } = data;
      models.Clients.findOrCreate({
        where: { phone },
        defaults: { name, email }
      }).spread((clientRes, created) => {
        const clientInfo = clientRes.dataValues;
        models.ClientCourses.create({
          client_id: clientInfo.id,
          course_id: courseId
        }).then((clientCoursesRes) => {
          return res.json({ success: true, msg: 'تم التسجيل بنجاح، سيتم الاتصال بك لاحقا' });
        }).catch((error) => {
          res.json({ err: 'Something went wrong try again' })
        });
      }).catch((error) => {
        res.json({ err: 'Something went wrong try again' })
      })
    }
  });
};