import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().required().min(3).max(20),
  password: [Joi.string().min(3).max(30), Joi.number().min(3).max(30)],
}).with('username', 'password');

export default (req, res, next) => {
  const { username, password } = req.body;
  Joi.validate({ username, password }, schema, (notValid) => {
    if (notValid) {
      res.send(JSON.stringify({ err: { errMsg: notValid.details[0].message } }));
    } else {
      next();
    }
  });
};
