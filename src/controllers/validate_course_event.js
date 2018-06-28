import Joi from 'joi';

const schema = Joi.object().keys({
  eventTitle: Joi.string().error(new Error('العنوان يجب ان يكون محصورا بين 3 و 50 حرف')).required().min(3).max(50),
  eventDate: Joi.date().error(new Error('صيغة التاريخ يجب ان تكون حسب الصيغة المعتدة ')).required(),
  startTime: Joi.string().error(new Error('وقت بداية الحدث يجب ان يكون بصيغة ساعة:دقائق:ثواني ')).regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/),
  endTime: Joi.string().error(new Error('وقت نهاية الحدث يجب ان يكون بصيغة ساعة:دقائق:ثواني')).regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/),
  eventPlace: Joi.number().integer().error(new Error('اختر من القائمة المنسدلة حصرا')),
  eventDiscription: Joi.string().error(new Error('وصف الفعالية يجب ان لايقل عن 50 حرفا')).min(50),
});

const course = Joi.object().keys({
  courseTitle: Joi.string().required().min(3).max(50).error(new Error('العنوان يجب ان يكون محصورا بين 3 و 50 حرف')),
  courseDiscription: Joi.string().min(50).error(new Error('وصف الفعالية يجب ان لايقل عن 50 حرفا')),
  courseFees: Joi.string().alphanum().error(new Error('قيمة رسوم الدورة يجب ان يتكون من حروف وارقام فقط')),
});

export const validateAddEvent = (req, res, next) => {
  const {
    eventTitle, eventDate, startTime, endTime, eventPlace, eventDiscription,
  } = req.body;
  Joi.validate({
    eventTitle, eventDate, startTime, endTime, eventPlace, eventDiscription,
  }, schema, (notValid) => {
    if (notValid) {
      res.render('adminAddEvent', {
        pageTitle: 'adminAddEvent', swal: true, layout: 'admin', errMsg: notValid.message,
      });
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
      res.render('adminAddCourse', {
        pageTitle: 'adminAddEvent', swal: true, layout: 'admin', errMsg: notValid.message,
      });
    } else {
      next();
    }
  });
};
