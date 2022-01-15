const { Op } = require("sequelize");
const { receitas, sequelize } = require("../models");

module.exports = {
  // POST -> Register a new income
  async register_income(req, res) {
    const {
      conta,
      valor,
      data_recebimento,
      data_recebimento_esperado,
      descricao,
      tipo_receita,
    } = req.body;

    const income = await receitas.create(
      {
        conta,
        valor,
        data_recebimento,
        data_recebimento_esperado,
        descricao,
        tipo_receita,
      },
      { individualHooks: true }
    );

    return res.json(income);
  },

  // PUT -> Edit a registered income
  async edit_income(req, res) {
    const receita = req.params.id;

    const {
      conta,
      valor,
      data_recebimento,
      data_recebimento_esperado,
      descricao,
      tipo_receita,
    } = req.body;

    const income = await receitas.update(
      {
        conta,
        valor,
        data_recebimento,
        data_recebimento_esperado,
        descricao,
        tipo_receita,
      },
      {
        where: { receita_id: `${receita}` },
        individualHooks: true,
      }
    );

    return res.json(income);
  },

  // DELETE -> Remove a registered income
  async delete_income(req, res) {
    const id = req.params.id;

    await receitas.destroy({
      where: { receita_id: `${id}` },
      individualHooks: true,
    });

    return res.send(`The income id: ${id}, has been removed`);
  },

  // GET -> List incomes
  async get_incomes(req, res) {
    const { ini_dt, end_dt, tp_rec } = req.query;

    let quering = {};

    switch (true) {
      // If all options was passed
      case typeof tp_rec != "undefined" &&
        typeof end_dt != "undefined" &&
        typeof ini_dt != "undefined":
        quering = {
          where: {
            data_recebimento: { [Op.between]: [ini_dt, end_dt] },
            tipo_receita: `${tp_rec}`,
          },
        };
        break;

      // If only the date options was passed
      case typeof tp_rec == "undefined" &&
        typeof end_dt != "undefined" &&
        typeof ini_dt != "undefined":
        quering = {
          where: {
            data_recebimento: { [Op.between]: [ini_dt, end_dt] },
          },
        };
        break;

      // If only the type of income was passed
      case typeof tp_rec != "undefined" &&
        typeof end_dt == "undefined" &&
        typeof ini_dt == "undefined":
        quering = {
          where: {
            tipo_receita: `${tp_rec}`,
          },
        };
        break;

      // If non query option was passed
      case typeof tp_rec == "undefined" &&
        typeof end_dt == "undefined" &&
        typeof ini_dt == "undefined":
        quering = {};
        break;

      default:
        return res.send(
          "Sorry, you miss something in the url request. Please! check it out"
        );
    }

    const db_query = await receitas.findAll(quering);

    return res.json(db_query);
  },

  // GET -> Total of incomes
  async get_total_incomes(req, res) {
    const total = await receitas.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("receita_id")), "Qtd_receitas"],
        [sequelize.fn("SUM", sequelize.col("valor")), "Valor_total"],
      ],
    });

    return res.json(total);
  },

  // GET -> Total of incomes by account
  async account_total_incomes(req, res) {
    const total = await receitas.findAll({
      attributes: [
        "conta",
        [sequelize.fn("COUNT", sequelize.col("receita_id")), "Qtd_receitas"],
        [sequelize.fn("SUM", sequelize.col("valor")), "Valor_total"],
      ],
      group: ["conta"],
    });

    return res.json(total);
  },
};
