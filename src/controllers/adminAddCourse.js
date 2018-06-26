import models from '../database/models';
import uploadPhoto from './uploadPhotos';

export const getAddCoursePage = (req, res) => {
  res.render('adminAddCourse', {
    pageTitle: 'adminAddCourse', swal: true, layout: 'admin',
  });
};

export const postCourse = (req, res, next) => {
  const {
    courseTitle, courseDiscription, courseFees,
  } = req.body;
  const { courseImage } = req.files;
  if (courseTitle && courseDiscription && courseFees) {
    uploadPhoto(courseImage, next, (photo) => {
      const imgLink = photo.url;
      models.EventCourses.create({
        title: courseTitle,
        description: courseDiscription,
        image: imgLink,
        fees: courseFees,
      })
        .then((data) => {
          res.redirect('/admin/events');
        })
        .catch((e) => {
          next(e);
        });
    });
  } else {
    res.render('adminAddEvent', {
      pageTitle: 'adminAddCourse', swal: true, layout: 'admin', errMsg: 'all fields are requierd ',
    });
  }
};
