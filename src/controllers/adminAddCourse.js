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
  uploadPhoto(courseImage, next, (photo) => {
    const { url } = photo;
    models.EventCourses.create({
      title: courseTitle,
      description: courseDiscription,
      image: url,
      fees: courseFees,
    })
      .then((data) => {
        res.redirect('/admin/events');
      })
      .catch((e) => {
        next(e);
      });
  });
};
