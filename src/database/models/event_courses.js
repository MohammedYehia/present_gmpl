export default (sequelize, DataTypes) => {
  const EventsCourses = sequelize.define('events_courses', {
    title: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    fees: {
      type: DataTypes.STRING,
    },
  });
  return EventsCourses;
};
