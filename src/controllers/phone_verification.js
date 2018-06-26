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
      if (error) {
        console.error('twilio start error', error);
        res.json({ err: 'Something went wrong try again'})
      } else {
        body = JSON.parse(body);
        console.log('body', body.message);
        createToken(data, res, (tokenErr, isToken) => {
          if (tokenErr) {
            console.error('createToken error', tokenErr);
            res.json({ err: 'Something went wrong try again'})
          } else if (isToken) {
            const msg = body.message.split('+')[1]
            res.json({ err: null, secondsToExp: body.seconds_to_expire, msg: `تم ارسال الرسالة بنجاح الى \n ${msg}` });
          }
        });
      }
  });
};

export const phoneVerifyCheck = (req, res, next) => {
  // verify phone twilio check code
  const { code } = req.body;
  const { token } = req.cookies;
  getToken(token,(getTokenErr, data) => {
    if (getTokenErr) {
      console.error('createToken error', getTokenErr);
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
        console.log('body', body);
        if (error) {
          console.error('createToken error', getTokenErr);
          res.json({ err: 'Something went wrong try again'})
        } else if (body.success) {
          console.log('success', body.success);
          next();
        } else {
          console.log('invalid code');
          res.json({ err: null, success: body.success });
        }
      });
    }
  });
};