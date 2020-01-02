module.exports = function (sequelize, DataTypes) {

  var addressBook = sequelize.define('addressBook', {

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return addressBook;
};