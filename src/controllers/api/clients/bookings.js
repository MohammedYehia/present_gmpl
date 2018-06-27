import models from '../../../database/models';
import { getToken } from '../../create_token'

export const getBookings = (req, res) => {
  models.sequelize.query("SELECT ext_bookings.event_title, bookings.start_at, bookings.end_at,bookings.room_id, events_courses.title FROM ext_bookings RIGHT OUTER JOIN bookings ON bookings.id = ext_bookings.booking_id LEFT OUTER JOIN events_courses ON events_courses.id = bookings.event_id").spread((results, metadata) => {
    const resObj =  results.map((booking) => {
      return Object.assign(
        {},
        {
          id: booking.id,
          start: booking.start_at,
          end: booking.end_at,
          resourceId: booking.room_id,
          title: booking.title || booking.event_title
        }
      );
   });
   res.json(resObj);
  })
};

export const postBookings = (req, res) => {
  const { token } = req.cookies;
  getToken(token,(getTokenErr, data) => {
    if (getTokenErr) {
      res.json({ err: 'Something went wrong try again' })
    } else {
      const {
        start_at,
        end_at,
        room_id,
        name,
        phone,
        email,
        event_title
      } = data;

      models.Bookings.create({
        start_at,
        end_at,
        room_id
      })
      .then((bookingRes) =>{
        models.Clients.findOrCreate({
          where: { phone },
          defaults: { name, email }
        }).then((clientRes) => {
          const clientInfo = clientRes[0].dataValues
        models.ExtBookings.create({
          client_id: clientInfo.id,
          booking_id: bookingRes.dataValues.id,
          event_title
        }).then((extBookingRes) => {
          res.json({ success: true, msg: 'تم حجز القاعة بنجاح، سيتم الاتصال بك لاحقا' })
        }).catch((error) => {
          res.json({ err: 'Something went wrong try again' })
        });
      }).catch((error) => {
        res.json({ err: 'Something went wrong try again' })
      });
    }).catch((error) => {
      res.json({ err: 'Something went wrong try again' })
    });
  }

  });
};
