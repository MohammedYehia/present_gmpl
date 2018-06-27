import models from '../database/models';

export default (req, res) => {
  const { url } = req;
  models.EventCourses.findAll({})
    .then((result) => {
      const courses = [];
      const events = [];
      let counter = 0;
      result.forEach((cell) => {
        if (cell.fees !== null) {
          counter += 1;
          courses.push(Object.assign(
            {},
            {
              id: cell.id,
              title: cell.title,
              image: cell.image,
              description: cell.description,
              fees: cell.fees,
            },
          ));
        } else {
          models.Bookings.findOne({
            where: { event_id: cell.id },
            include: {
              model: models.Rooms,
            },
          })
            .then((booking) => {
              counter += 1;
              if (booking) {
                events.push(Object.assign(
                  {},
                  {
                    id: cell.id,
                    title: cell.title,
                    image: cell.image,
                    description: cell.description,
                    event_time: booking.start_at,
                    room_name: booking.room.room_name,
                  },
                ));
              }
              if (counter === result.length) {
                if (url.includes('/events') && url.length === 7) {
                  res.render('events', { events, cssFile: 'style' });
                } else if (url.includes('/courses') && url.length === 8) {
                  res.render('events', { courses, cssFile: 'style' });
                }
              }
            });
        }
      });
    });
};
