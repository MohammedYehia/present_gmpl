import models from '../models/index';

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

models.sequelize.sync().then(() => {
  models.ExtBookings.bulkCreate([{
    eventTitle: 'امسية شعرية',
    booking_id: 1,
    client_id: 1,
  },
  {
    client_id: 2,
    booking_id: 5,
    eventTitle: 'لقاء ثقافي',
  },
  {
    client_id: 3,
    booking_id: 6,
    eventTitle: 'ندوة سياسية',
  },
  ]);
});
