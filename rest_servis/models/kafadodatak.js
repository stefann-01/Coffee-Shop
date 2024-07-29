'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KafaDodatak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KafaDodatak.init({
    kafa_id: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: false
    },
    dodatak_id: {
      type: DataTypes.STRING(120),
      unique: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'KafaDodatak',
  });
  return KafaDodatak;
};