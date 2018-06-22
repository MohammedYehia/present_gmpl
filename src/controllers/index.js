import express from 'express';
import home from './home';
import { getLogin, postLogin } from './login';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', getLogin)
  .post('/admin/login', postLogin);

export default router;
