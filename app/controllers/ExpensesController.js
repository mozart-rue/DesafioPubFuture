const { Op } = require("sequelize");
const { despesas, sequelize, receitas } = require("../models");

module.exports = {
  // POST -> Register a new expense
  async register_expense(req, res) {
    const {
      conta,
      valor,
      data_pagamento,
      data_pagamento_esperado,
      tipo_despesa,
    } = req.body;

    const expense = await despesas.create(
      {
        conta,
        valor,
        data_pagamento,
        data_pagamento_esperado,
        tipo_despesa,
      },
      { individualHooks: true }
    );

    return res.json(expense);
  },

  // PUT -> Edit expense
  async edit_expense(req, res) {
    const id = req.params.id;

    const {
      conta,
      valor,
      data_pagamento,
      data_pagamento_esperado,
      tipo_despesa,
    } = req.body;

    const expense = await despesas.update(
      {
        conta,
        valor,
        data_pagamento,
        data_pagamento_esperado,
        tipo_despesa,
      },
      { where: { despesa_id: `${id}` }, individualHooks: true }
    );

    return res.json(expense);
  },

  // DELETE -> Remove an expense
  async delete_expense(req, res) {
    const id = req.params.id;

    await despesas.destroy({
      where: { despesa_id: id },
      individualHooks: true,
    });

    return res.send(`Expense id: ${id}, has been removed`);
  },

  // GET -> List expenses
  async get_expenses(req, res) {
    const { ini_dt, end_dt, tp_des } = req.query;

    let quering = {};

    switch (true) {
      // If all options was passed
      case typeof tp_des != "undefined" &&
        typeof end_dt != "undefined" &&
        typeof ini_dt != "undefined":
        quering = {
          where: {
            data_pagamento: { [Op.between]: [ini_dt, end_dt] },
            tipo_despesa: `${tp_des}`,
          },
        };
        break;

      // If only the date options was passed
      case typeof tp_des == "undefined" &&
        typeof end_dt != "undefined" &&
        typeof ini_dt != "undefined":
        quering = {
          where: {
            data_pagamento: { [Op.between]: [ini_dt, end_dt] },
          },
        };
        break;

      // If only the type of expense was passed
      case typeof tp_des != "undefined" &&
        typeof end_dt == "undefined" &&
        typeof ini_dt == "undefined":
        quering = {
          where: {
            tipo_despesa: `${tp_des}`,
          },
        };
        break;

      // If non query option was passed
      case typeof tp_des == "undefined" &&
        typeof end_dt == "undefined" &&
        typeof ini_dt == "undefined":
        quering = {};
        break;

      default:
        return res.send(
          "Sorry, you miss something in the url request. Please! check it out"
        );
    }

    const db_query = await despesas.findAll(quering);

    return res.json(db_query);
  },

  // GET -> Total of expenses
  async get_total_expenses(req, res) {
    const total = await despesas.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("despesa_id")), "Qtd_despesas"],
        [sequelize.fn("SUM", sequelize.col("valor")), "Valor_total"],
      ],
    });

    return res.json(total);
  },

  // GET -> Total of expenses by account
  async account_total_expenses(req, res) {
    const total = await despesas.findAll({
      attributes: [
        "conta",
        [sequelize.fn("COUNT", sequelize.col("despesa_id")), "Qtd_despesas"],
        [sequelize.fn("SUM", sequelize.col("valor")), "Valor_total"],
      ],
      group: ["conta"],
    });

    return res.json(total);
  },

  // PUT -> Tranfering money between accounts
  async bank_transfer(req, res) {
    const {
      conta_saida,
      conta_destino,
      valor_trans,
      dt_trans,
      dt_trans_esp,
      tipo,
      descricao,
    } = req.body;

    await despesas.create(
      {
        conta: conta_saida,
        valor: valor_trans,
        data_pagamento: dt_trans,
        data_pagamento_esperado: dt_trans_esp,
        tipo_despesa: tipo,
      },
      { individualHooks: true }
    );

    await receitas.create(
      {
        conta: conta_destino,
        valor: valor_trans,
        data_recebimento: dt_trans,
        data_recebimento_esperado: dt_trans_esp,
        descricao,
        tipo_receita: tipo,
      },
      { individualHooks: true }
    );

    return res.send(
      `Success Bank transfer from account: ${conta_saida} to account: ${conta_destino}`
    );
  },
};
