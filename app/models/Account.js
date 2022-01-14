const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const contas = sequelize.define("contas", {
    conta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: DataTypes.STRING,
    saldo: DataTypes.FLOAT,
    tipo_conta: DataTypes.STRING,
    inst_financeira: DataTypes.STRING,
  });

  return contas;
};
