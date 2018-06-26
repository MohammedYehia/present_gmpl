export default (sequelize, DataTypes) => {
  const Bookings = sequelize.define('bookings', {
    start_at: {
      type: DataTypes.DATE,
    },
    end_at: {
      type: DataTypes.DATE,
    },
  });

  return Bookings;
};
