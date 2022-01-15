const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const receitas = sequelize.define(
    "receitas",
    {
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
    },
    {
      hooks: {
        afterCreate: async (receita) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo + ${receita.valor}`),
            },
            { where: { conta: receita.conta } }
          );
        },
        beforeDestroy: async (receita) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo - ${receita.valor}`),
            },
            { where: { conta: receita.conta } }
          );
        },
        beforeUpdate: async (receita) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(
                `saldo - ${receita._previousDataValues.valor}`
              ),
            },
            {
              where: { conta: receita.conta },
            }
          );
        },
        afterUpdate: async (receita) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo + ${receita.valor}`),
            },
            { where: { conta: receita.conta } }
          );
        },
      },
    }
  );

  return receitas;
};
