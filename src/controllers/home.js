import models from '../database/models';

export default (req, res) => {
  models.EventCourses.findAll({}).then((data) => {
    const courses = [];
    const events = [];
    for (const cell of data) {
      if (courses.length >= 3 && events.length >= 3) break;
      if (cell.fees && courses.length !== 3) {
        courses.push(cell);
      } else if (events.length !== 3) {
        events.push(cell);
      }
    }

    res.render('home', { courses, events });
  });
};
