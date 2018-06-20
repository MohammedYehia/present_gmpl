import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const Staff = sequelize.define('staff', {
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 8);
      },
    },
  });
  return Staff;
};
