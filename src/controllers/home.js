import models from '../database/models';

export default (req, res) => {
  models.EventCourses.findAll({}).then((data) => {
    const courses = [];
    const events = [];
    data.forEach(cell => (cell.fees !== null ? courses.push(cell) : events.push(cell)));
    res.render('home', { courses, events });
  });
};
