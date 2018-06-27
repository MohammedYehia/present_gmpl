import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  const { token } = req.cookies;
  if (token && req.cookies) {
    verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(err);
      } else if (decoded) {
        (req.url === '/login') ? res.redirect('/admin/home') : next();
      } else {
        res.redirect('admin/login');
      }
    });
  } else if (req.url === '/login') {
    next();
  } else {
    res.redirect('/admin/login');
  }
};
