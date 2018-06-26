import models from '../database/models';

export default (req, res) => {
  const roomId = req.params.id;
  let roomName = '';
  models.Rooms.findOne({ where: { id: roomId } }).then((roomInfo) => {
    roomName = roomInfo.room_name;
    models.ExtBookings.findAll({
      include: [{
        model: models.Bookings,
        where: { room_id: roomId },
        includes: [{
          model: models.Rooms,
        }],
      }, {
        model: models.Clients,
      }],
    }).then((result) => {
      res.render('admin_rooms', {
        pageTitle: 'admin Rooms',
        layout: 'admin',
        clients: result,
        roomName,
        jsFile: ['admin'],
      });
    });
  });
};
