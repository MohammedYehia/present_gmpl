import fs from 'fs';
import cloudinary from 'cloudinary';

export default (img, next, cb) => {
  const imgUrl = `./src/${Date.now()}${img.name}`;
  img.mv(imgUrl, (err) => {
    if (err) {
      next(err);
    } else {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });
      cloudinary.uploader.upload(imgUrl, (result) => {
        fs.unlink(imgUrl, (error) => {
          if (error) {
            next(error);
          }
        });
        cb(result);
      });
    }
  });
};
