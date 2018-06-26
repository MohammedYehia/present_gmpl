
export default (req, res) => {
  res.render('admin_home', {
    pageTitle: 'admin Home Page',
    layout: 'admin',
    jsFile: ['admin'],
  });
};
