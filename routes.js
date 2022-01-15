const express = require("express");
const routes = express.Router();

const AccountController = require("./app/controllers/AccountController");

// --------- Routes related to Account --------- //

// Create a new account
routes.post("/create_account", AccountController.create_account);

// Edit an account
routes.put("/edit_account/:id", AccountController.edit_account);

// Remove an account
routes.delete("/delete_account/:id", AccountController.delete_account);

// List accounts
routes.get("/get_accounts", AccountController.list_accounts);

// List total bank balance
routes.get("/get_total_balance", AccountController.total_bank_balance);

// --------------------------------------------- //

module.exports = routes;
