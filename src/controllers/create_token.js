import jsonwebtoken from 'jsonwebtoken';

export default (data, res, cb) => {
  jsonwebtoken.sign(JSON.stringify(data), process.env.SECRET, (err, token) => {
    if (err) return cb(err);
    res.cookie('token', token);
    return cb(null, true);
  });
};
