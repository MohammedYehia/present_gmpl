export default (sequelize, DataTypes) => {
  const RoomsImages = sequelize.define('rooms_images', {
    img_url: {
      type: DataTypes.STRING,
    },
  });
  return RoomsImages;
};
