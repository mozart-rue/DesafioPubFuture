const { contas, sequelize } = require("../models");

module.exports = {
  // POST -> Create a new account
  async create_account(req, res) {
    const { nome, saldo, tipo_conta, inst_financeira } = req.body;

    const user = await contas.create({
      nome,
      saldo,
      tipo_conta,
      inst_financeira,
    });

    return res.json(user);
  },

  // PUT -> Edit an account
  async edit_account(req, res) {
    const account_id = req.params.id;

    const { nome, tipo_conta, inst_financeira } = req.body;

    await contas.update(
      {
        nome: `${nome}`,
        tipo_conta: `${tipo_conta}`,
        inst_financeira: `${inst_financeira}`,
      },
      {
        where: { conta: `${account_id}` },
      }
    );

    return res.send(`The account ${account_id} has been updated`);
  },

  // DELETE -> Remove an account
  async delete_account(req, res) {
    const account_id = req.params.id;

    await contas.destroy({
      where: { conta: `${account_id}` },
    });

    return res.send(`Account ${account_id} has been deleted`);
  },

  // GET -> List all registered accounts
  async list_accounts(req, res) {
    const accounts = await contas.findAll();

    return res.json(accounts);
  },

  // GET -> List total Bank Balance
  async total_bank_balance(req, res) {
    const total = await contas.findAll({
      attributes: [
        [sequelize.fn("sum", sequelize.col("saldo")), "saldo_total"],
      ],
    });

    return res.json(total);
  },
};
