import express from 'express';
import home from './home';
import login from './login';

const router = express.Router();

router
  .get('/', home)
  .get('/admin/login', login);

export default router;
