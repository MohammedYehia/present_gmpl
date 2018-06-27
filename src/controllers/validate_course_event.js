import Joi from 'joi';

const schema = Joi.object().keys({
  eventTitle: Joi.string().required().min(3).max(50),
  eventDate: Joi.date().required(),
  startTime: Joi.string().regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/),
  endTime: Joi.string().regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/),
  eventPlace: Joi.number().integer(),
  eventDiscription: Joi.string().min(50),
});

const course = Joi.object().keys({
  courseTitle: Joi.string().required().min(3).max(50),
  courseDiscription: Joi.string().min(50),
  courseFees: Joi.string().alphanum(),
});

export const validateAddEvent = (req, res, next) => {
  const {
    eventTitle, eventDate, startTime, endTime, eventPlace, eventDiscription,
  } = req.body;
  Joi.validate({
    eventTitle, eventDate, startTime, endTime, eventPlace, eventDiscription,
  }, schema, (notValid) => {
    if (notValid) {
      res.send(JSON.stringify({ err: { errMsg: notValid.details[0].message } }));
    } else {
      next();
    }
  });
};

export const validateAddCourse = (req, res, next) => {
  const {
    courseTitle, courseDiscription, courseFees,
  } = req.body;
  Joi.validate({
    courseTitle, courseDiscription, courseFees,
  }, course, (notValid) => {
    if (notValid) {
      res.send(JSON.stringify({ err: { errMsg: notValid.details[0].message } }));
    } else {
      next();
    }
  });
};
