import models from '../../../database/models';

const colors = {
  1: '#26ADEA',
  2: '#566199',
  3: '#FFA569',
  4: '#2ABDFF',
  5: '#CC3D0D'
};

export default (req, res) => {
  models.Rooms.findAll().then((rooms) => {
    const resObj = rooms.map((room) => {
      return Object.assign(
        {
	  id: room.dataValues.id,
	  title: room.dataValues.room_name,
	  eventColor: colors[room.dataValues.id]
	}
      )
    });
    console.log('rooms', resObj);
    res.json(resObj);
  })
   .catch((error) => {
     console.error('get rooms api error', error);
     res.json({
       error: 'some error happens try again later'
     });
   });
};
