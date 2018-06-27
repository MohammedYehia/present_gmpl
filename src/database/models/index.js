import models from '../config/db';

const { sequelize } = models;

models.Bookings = sequelize.import('./bookings');
models.Clients = sequelize.import('./clients');
models.Rooms = sequelize.import('./rooms');
models.RoomImgs = sequelize.import('./rooms_imgs');
models.EventCourses = sequelize.import('./event_courses');
models.Staff = sequelize.import('./staff');
models.ClientCourses = sequelize.import('./client_courses');
models.ExtBookings = sequelize.import('./ext_bookings');

// Relations;
models.Bookings.belongsTo(models.Rooms, {
  onDelete: 'CASCADE',
  foreignKey: 'room_id',
  targetKey: 'id',
});

models.RoomImgs.belongsTo(models.Rooms, {
  onDelete: 'CASCADE',
  foreignKey: 'room_id',
  targetKey: 'id',
});

models.Bookings.belongsTo(models.EventCourses, {
  onDelete: 'CASCADE',
  foreignKey: 'event_id',
  targetKey: 'id',
});

models.ExtBookings.belongsTo(models.Bookings, {
  onDelete: 'CASCADE',
  foreignKey: 'booking_id',
  targetKey: 'id',
});

models.ExtBookings.belongsTo(models.Clients, {
  onDelete: 'CASCADE',
  foreignKey: 'client_id',
  targetKey: 'id',
});

models.ClientCourses.belongsTo(models.Clients, {
  onDelete: 'CASCADE',
  foreignKey: 'client_id',
  targetKey: 'id',
});

models.ClientCourses.belongsTo(models.EventCourses, {
  onDelete: 'CASCADE',
  foreignKey: 'course_id',
  targetKey: 'id',
});

export default models;
