import models from '../database/models';
import uploadPhoto from './uploadPhotos';

export const getAddCoursePage = (req, res) => {
  res.render('adminAddCourse', {
    pageTitle: 'adminAddCourse', swal: true, layout: 'admin',
  });
};

const uploadPromise = (req, res)=> new Promise((resolve, reject) => resolve(req.files));


export const postCourse = async (req, res, next) => {
  const {
    courseTitle, courseDiscription, courseFees,
  } = req.body;
  const files = await uploadPromise(req, res);
  uploadPhoto(files.courseImage, next, (photo) => {
    const { url } = photo;
    models.EventCourses.create({
      title: courseTitle,
      description: courseDiscription,
      image: url,
      fees: courseFees,
    })
      .then(() => {
        res.redirect('/admin/courses');
      })
      .catch((e) => {
        next(e);
      });
  });
};
