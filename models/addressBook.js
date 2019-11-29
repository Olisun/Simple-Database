module.exports = function (sequelize, DataTypes) {

  var addressBook = sequelize.define('addressBook', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return addressBook;
};