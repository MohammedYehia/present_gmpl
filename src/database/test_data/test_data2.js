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
  models.RoomImgs.bulkCreate([{
    img_url: 'http:img.png',
    room_id: 1,
  }]);

  models.ClientCourses.bulkCreate([{
    client_id: 1,
    event_id: 1,
  },
  {
    client_id: 2,
    event_id: 1,
  },
  {
    client_id: 3,
    event_id: 1,
  },
  {
    client_id: 1,
    event_id: 2,
  },
  {
    client_id: 2,
    event_id: 2,
  },
  {
    client_id: 3,
    event_id: 2,
  },
  {
    client_id: 4,
    event_id: 2,
  },
  ]);

  models.Bookings.bulkCreate([{
    event_id: 4,
    start: '2018-06-25 12:30:00',
    end: '2018-06-25 14:30:00',
    room_id: 3,
  },
  {
    event_id: 5,
    start: '2018-06-28 16:00:00',
    end: '2018-06-28 18:30:00',
    room_id: 1,
  },
  {
    eventCourse_id: 6,
    start: '2018-07-15 12:00:00',
    end: '2018-07-15 14:00:00',
    room_id: 2,
  },
  {
    event_id: 1,
    start: '2018-07-16 10:00:00',
    end: '2018-07-16 12:00:00',
    room_id: 3,
  },
  {
    event_id: 2,
    start: '2018-07-16 13:00:00',
    end: '2018-07-16 15:00:00',
    room_id: 3,
  },
  {
    event_id: 3,
    start: '2018-07-17 12:00:00',
    end: '2018-07-17 14:00:00',
    room_id: 2,
  },
  ]);
});
