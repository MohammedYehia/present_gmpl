import models from '../database/models';
import uploadPhoto from './uploadPhotos';

export const getAdminPage = (req, res) => {
  res.render('adminAddEvent', {
    pageTitle: 'adminAddEvent', swal: true, layout: 'admin', jsFile: ['admin', 'admin_events_courses'],
  });
};

export const postEvent = (req, res, next) => {
  const {
    eventTitle, eventDate, startTime, endTime, eventPlace, eventDiscription,
  } = req.body;
  const { eventImage } = req.files;
  uploadPhoto(eventImage, next, (result) => {
    const imgLink = result.url;
    models.EventCourses.create({
      title: eventTitle,
      description: eventDiscription,
      image: imgLink,
    }).then((evt) => {
      const sTime = `${eventDate} ${startTime}:00`;
      const eTime = `${eventDate} ${endTime}:00`;
      models.Bookings.create({
        event_id: evt.dataValues.id,
        start_at: new Date(sTime),
        end_at: new Date(eTime),
        room_id: eventPlace,
      })
        .then((output) => {
          res.redirect('/admin/events');
        });
    }).catch((e) => {
      next(e);
    });
  });
};
