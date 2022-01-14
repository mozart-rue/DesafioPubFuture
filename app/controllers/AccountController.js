const { contas } = require("../models");

module.exports = {
  // POST -> Create a new account
  async create_account(req, res) {
    // get data from request
    const { nome, saldo, tipo_conta, inst_financeira } = req.body;

    // Insert Values into the database
    const user = await contas.create({
      nome,
      saldo,
      tipo_conta,
      inst_financeira,
    });

    return res.json(user);
  },
};
