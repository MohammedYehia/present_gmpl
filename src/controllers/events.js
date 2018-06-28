import models from '../database/models';

export default (req, res) => {
  const { url } = req;
  models.EventCourses.findAll({}).then((data) => {
    const courses = [];
    const events = [];
    for (const cell of data) {
      if (cell.fees ) {
        courses.push(cell);
      } else{
        events.push(cell);
      }
    }

    if (url.includes('/events') && url.length === 7) {
      res.render('events', { events, cssFile: 'style' });
    } else if (url.includes('/courses') && url.length === 8) {
      res.render('events', { courses, cssFile: 'style' });
    }
  });
};
