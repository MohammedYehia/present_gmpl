import models from '../database/models';

export default (req, res) => {
  const { url } = req;
  models.EventCourses.findAll({}).then((data) => {
    const courses = [];
    const events = [];
    data.forEach(cell => (cell.fees !== null ? courses.push(cell) : events.push(cell)));
    if (url.includes('/events') && url.length === 7) {
      res.render('events', { events });
    } else if (url.includes('/courses') && url.length === 8) {
      res.render('events', { courses });
    }
  });
};
