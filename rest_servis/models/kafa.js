'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kafa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Kategorija, Dodatak, StavkaNarudzbine}) {
      this.belongsTo(Kategorija, {foreignKey:"kategorija_id", as:"kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey:"kafa_id", as:"kafaStavka"});
      this.belongsToMany(Dodatak, {foreignKey:"kafa_id", as:"dodatak", through:"KafaDodatak"});
    }
  }
  Kafa.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    },
    opis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cena: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kategorija_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Kafa',
  });
  return Kafa;
};