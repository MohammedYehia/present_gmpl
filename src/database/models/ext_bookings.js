export default (sequelize, DataTypes) => {
  const ExtBookings = sequelize.define('ext_bookings', {
    eventTitle: {
      type: DataTypes.STRING,
    },
  });
  return ExtBookings;
};
