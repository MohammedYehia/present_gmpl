import jsonwebtoken from 'jsonwebtoken';

export const createToken = (data, res, cb) => {
  jsonwebtoken.sign(JSON.stringify(data), process.env.SECRET, (err, token) => {
    if (err) return cb(err);
    res.cookie('token', token);
    return cb(null, true);
  });
};

export const getToken = (token, cb) => {
  jsonwebtoken.verify(token, process.env.SECRET, (verifyError, decoded) => {
    if (verifyError) {
      cb(verifyError);
    } else {
      cb(null, decoded);
    }
  });
};