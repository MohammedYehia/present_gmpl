import Joi from 'joi';

const schema = Joi.number().integer();
export default (req, res, next) => {
  const isNumber = Joi.validate(req.params.id, schema);
  isNumber.error === null ? next() : next(isNumber.error);
};
