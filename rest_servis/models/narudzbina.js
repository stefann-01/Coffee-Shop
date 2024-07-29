'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({StavkaNarudzbine}) {
      this.hasMany(StavkaNarudzbine, {foreignKey:"narudzbina_id", as:"narudzbinaStavka"});
    }
  }
  Narudzbina.init({
    vreme_narucivanja: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    zakazano_vreme: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    },
    adresa: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    },
    telefon: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    },
    ime_prezime: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};