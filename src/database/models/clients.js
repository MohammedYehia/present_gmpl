export default (sequelize, DataTypes) => {
  const Clients = sequelize.define('clients', {
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  });
  return Clients;
};
