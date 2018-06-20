export default (sequelize, DataTypes) => {
  const Clients = sequelize.define('clients', {
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });
  return Clients;
};
