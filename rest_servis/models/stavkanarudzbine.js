'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Kafa, Narudzbina}) {
      this.belongsTo(Kafa, {foreignKey:"kafa_id", as:"stavkaKafa"});
      this.belongsTo(Narudzbina, {foreignKey:"narudzbina_id", as:"stavkaNarudzbina"});
    }
  }
  StavkaNarudzbine.init({
    narudzbina_id: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    kafa_id: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    komada: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    jedinicna_cena: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
  });
  return StavkaNarudzbine;
};