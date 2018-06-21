export default (sequelize, DataTypes) => {
  const Bookings = sequelize.define('bookings', {
    start: {
      type: DataTypes.DATE,
    },
    end: {
      type: DataTypes.DATE,
    },
  });

  return Bookings;
};
