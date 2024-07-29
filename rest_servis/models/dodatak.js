'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dodatak extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Kafa}) {
      this.belongsToMany(Kafa, {foreignKey:"dodatak_id", as:"kafe", through:"KafaDodatak"});
    }
  }
  Dodatak.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Dodatak',
  });
  return Dodatak;
};