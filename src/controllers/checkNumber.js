import Joi from 'joi';

const schema = Joi.number().integer().min(1).max(50);
export default (req, res, next) => {
  const isNumber = Joi.validate(req.params.id, schema);
  isNumber.error === null ? next() : next(isNumber.error);
};
