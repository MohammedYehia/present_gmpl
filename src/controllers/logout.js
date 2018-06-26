export default (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
};
