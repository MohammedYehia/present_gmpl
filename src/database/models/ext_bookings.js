export default (sequelize, DataTypes) => {
  const ExtBookings = sequelize.define('ext_bookings', {
    event_title: {
      type: DataTypes.STRING,
    },
  });
  return ExtBookings;
};
