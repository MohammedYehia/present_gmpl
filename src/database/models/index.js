import Sequelize from 'sequelize';
import env2 from 'env2';

env2('./config.env');

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: DB_DIALECT,
  operatorsAliases: false,
  host: process.env.HOSTNAME || 'localhost',
  define: {
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const models = {
  Bookings: sequelize.import('./bookings'),
  Clients: sequelize.import('./clients'),
  Rooms: sequelize.import('./rooms'),
  RoomImgs: sequelize.import('./rooms_imgs'),
  EventCourses: sequelize.import('./event_courses'),
  Staff: sequelize.import('./staff'),
  ClientCourses: sequelize.import('./user_courses'),
  ExtBookings: sequelize.import('./ext_bookings'),
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

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
