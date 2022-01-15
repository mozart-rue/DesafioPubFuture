const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const receitas = sequelize.define("receitas", {
    receita_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    conta: DataTypes.INTEGER,
    valor: DataTypes.FLOAT,
    data_recebimento: DataTypes.DATEONLY,
    data_recebimento_esperado: DataTypes.DATEONLY,
    descricao: DataTypes.STRING,
    tipo_receita: DataTypes.STRING,
  });

  return receitas;
};
