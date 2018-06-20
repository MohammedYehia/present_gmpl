import express from 'express';
import home from './home';
import login from './login';

const router = express.Router();

router
  .get('/', home.get)
  .get('/admin/login', login.get);

export default router;
