const express = require("express");
const { route } = require("express/lib/application");
const routes = express.Router();

const AccountController = require("./app/controllers/AccountController");
const IncomeController = require("./app/controllers/IncomesController");

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

// --------- Routes related to Incomes --------- //

// Register a new income
routes.post("/register_income", IncomeController.register_income);

// Editing an income
routes.put("/edit_income/:id", IncomeController.edit_income);

// Remove a registered income
routes.delete("/delete_income/:id", IncomeController.delete_income);

// List incomes with condition
routes.get("/get_incomes", IncomeController.get_incomes);

// List total of incomes
routes.get("/total_incomes", IncomeController.get_total_incomes);

// List total of incomes group by account
routes.get("/total_incomes/by_account", IncomeController.account_total_incomes);

// --------------------------------------------- //

module.exports = routes;
