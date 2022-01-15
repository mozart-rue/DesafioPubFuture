const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const despesas = sequelize.define(
    "despesas",
    {
      despesa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      conta: DataTypes.INTEGER,
      valor: DataTypes.FLOAT,
      data_pagamento: DataTypes.DATEONLY,
      data_pagamento_esperado: DataTypes.DATEONLY,
      tipo_despesa: DataTypes.STRING,
    },
    {
      hooks: {
        afterCreate: async (despesa) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo - ${despesa.valor}`),
            },
            { where: { conta: despesa.conta } }
          );
        },
        beforeDestroy: async (despesa) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo + ${despesa.valor}`),
            },
            { where: { conta: despesa.conta } }
          );
        },
        beforeUpdate: async (despesa) => {
          console.log(despesa.valor);
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(
                `saldo + ${despesa._previousDataValues.valor}`
              ),
            },
            {
              where: { conta: despesa.conta },
            }
          );
        },
        afterUpdate: async (despesa) => {
          await sequelize.models.contas.update(
            {
              saldo: sequelize.literal(`saldo - ${despesa.valor}`),
            },
            { where: { conta: despesa.conta } }
          );
        },
      },
    }
  );

  return despesas;
};
