export default (sequelize, DataTypes) => {
  const EventsCourses = sequelize.define('events_courses', {
    title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    event_time: {
      type: DataTypes.DATE,
    },
    fees: {
      type: DataTypes.STRING,
    },
  });
  return EventsCourses;
};
