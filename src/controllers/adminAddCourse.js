import models from '../database/models';
import uploadPhoto from './uploadPhotos';

export const getAddCoursePage = (req, res) => {
  res.render('adminAddCourse', {
    pageTitle: 'adminAddCourse', swal: true, layout: 'admin', jsFile: ['admin', 'admin_events_courses'],

  });
};

export const postCourse = async (req, res, next) => {
  const {
    courseTitle, courseDiscription, courseFees,
  } = req.body;
  const { courseImage } = req.files;
  await uploadPhoto(courseImage, next, (photo) => {
    const { url } = photo;
    models.EventCourses.create({
      title: courseTitle,
      description: courseDiscription,
      image: url,
      fees: courseFees,
    })
      .then((data) => {
        res.redirect('/admin/courses');
      })
      .catch((e) => {
        next(e);
      });
  });
};
