export default (sequelize, DataTypes) => {
  const Rooms = sequelize.define('rooms', {
    room_name: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    lcd: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Rooms;
};
