import bcrypt from 'bcryptjs';
import Joi from 'joi';
import models from './../database/models/index';
import createToken from './create_token';

const getLogin = (req, res) => {
  res.render('login', {
    layout: 'admin',
    pageTitle: 'Admin Login',
    jsFile: ['login'],
    swal: true,
    login: true,
  });
};
const postLogin = (req, res, next) => {
  const { username, password } = req.body;
  const schema = Joi.object().keys({
    username: Joi.string().required().min(3).max(20),
    password: [Joi.string().min(3).max(30), Joi.number().min(3).max(30)],
  }).with('username', 'password');
  Joi.validate({ username, password }, schema, (notValid) => {
    if (notValid) {
      res.send(JSON.stringify({ err: { errMsg: notValid.details[0].message } }));
    } else {
      models.Staff.findOne({ where: { username: username.toLowerCase() } }).then((result) => {
        if (result && result.dataValues) {
          bcrypt.compare(password, result.dataValues.password, (err, isTrue) => {
            if (err) {
              next(err);
            } else if (isTrue) {
              const data = JSON.stringify({
                id: result.dataValues.id,
                adminName: result.dataValues.username,
              });
              createToken(data, res, (tokenErr, isToken) => {
                if (tokenErr) {
                  next(tokenErr);
                } else if (isToken) {
                  res.status(200).send(JSON.stringify({ rediect: '/admin/home' }));
                }
              });
            } else {
              res.send(JSON.stringify({ err: { errMsg: 'Invalied Password or Username' } }));
            }
          });
        } else {
          res.send(JSON.stringify({ err: { errMsg: 'Invalied Password or Username' } }));
        }
      });
    }
  });
};
export { getLogin, postLogin };
