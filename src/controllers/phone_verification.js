import request from 'request';
import { createToken, getToken } from './create_token';

export const phoneVerifyStart = (req, res) => {
  const data = req.body;
  // verify phone twilio start
  request({
    method: 'POST',
    uri: 'https://api.authy.com/protected/json/phones/verification/start',
    headers: {
      'content-type' : 'application/x-www-form-urlencoded',
      'X-Authy-API-Key':process.env.TWILIO_KEY
    },
    body: `via=sms&phone_number=${data.phone}&country_code=970&code_length=6&locale=en`
    }, (error, response, body) => {
      if (error) 
       return  res.json({ err: 'Something went wrong try again'});
        const { success, message, seconds_to_expire } = JSON.parse(body);
        if (success) {
        createToken(data, res, (tokenErr, isToken) => {
          if (tokenErr) 
          return  res.json({ err: 'Something went wrong try again'})
          const msg = message.split('+')[1]
          return   res.json({ err: null, secondsToExp: seconds_to_expire, msg: `تم ارسال الرسالة بنجاح الى \n ${msg}` });
        });
      } else {
        res.json({ err: 'Something went wrong try again'})
      }
  });
};

export const phoneVerifyCheck = (req, res, next) => {
  // verify phone twilio check code
  const { code } = req.body;
  const { token } = req.cookies;
  getToken(token,(getTokenErr, data) => {
    if (getTokenErr) {
      res.json({ err: 'Something went wrong try again'})
    } else {
      const { phone } = data;
      request({
        method: 'GET',
        uri: 'https://api.authy.com/protected/json/phones/verification/check',
        headers: {
          'content-type' : 'application/x-www-form-urlencoded',
          'X-Authy-API-Key':process.env.TWILIO_KEY
        },
        body: `phone_number=${phone}&country_code=970&verification_code=${code}`
      }, (error, response, body) => {
        body = JSON.parse(body);
        if (error) {
          res.json({ err: 'Something went wrong try again'})
        } else if (body.success) {
          next();
        } else {
          res.json({ err: null, success: body.success });
        }
      });
    }
  });
};