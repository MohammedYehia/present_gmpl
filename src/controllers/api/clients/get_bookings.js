import models from '../../../database/models';
import { getToken } from '../../create_token'

export const getBookings = (req, res) => {
  models.sequelize.query("SELECT ext_bookings.event_title, bookings.starts_at, bookings.ends_at,bookings.room_id, events_courses.title FROM ext_bookings RIGHT OUTER JOIN bookings ON bookings.id = ext_bookings.booking_id LEFT OUTER JOIN events_courses ON events_courses.id = bookings.event_id").spread((results, metadata) => {
    const resObj =  results.map((booking) => {
      console.log(booking);
      return Object.assign(
        {},
        {
          id: booking.id,
          start: booking.starts_at,
          end: booking.ends_at,
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
  console.log('==============<>==', token)
  getToken(token,(getTokenErr, data) => {
    if (getTokenErr) {
      console.error('createToken error', getTokenErr);
      res.json({ err: 'Something went wrong try again' })
    } else {
      const {
        starts_at,
        ends_at,
        room_id,
        name,
        phone,
        email,
        event_title
      } = data;

      console.log(data);
    // insert into Bookings table
      models.Bookings.create({
        starts_at,
        ends_at,
        room_id
      })
      .then((bookingRes) =>{
        console.log('insert into booking result', bookingRes);
        // insert into users table
        models.Clients.findOrCreate({
          where: { phone },
          defaults: { name, email }
      }).then((clientRes) => {
        console.log('insert into clients result', clientRes);
        const clientInfo = clientRes[0].dataValues
        // insert into extBooking table
        models.ExtBookings.create({
          client_id: clientInfo.id,
          booking_id: bookingRes.dataValues.id,
          event_title
        }).then((extBookingRes) => {
          console.log('insert into clients result', extBookingRes);
          res.json({ success: true, msg: 'تم حجز القاعة بنجاح، سيتم الاتصال بك لاحقا' })
        }).catch((error) => {
          console.error('insert into extBookings error', error);
        });
      }).catch((error) => {
        console.error('insert into clients error', error);
      });
    }).catch((error) => {
      console.error('insert into bookings error', error);
    });
  }

  });
};
