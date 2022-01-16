const express = require("express");
const routes = express.Router();

const AccountController = require("./app/controllers/AccountController");
const IncomeController = require("./app/controllers/IncomesController");
const ExpensesController = require("./app/controllers/ExpensesController");

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

// List incomes with options
routes.get("/get_incomes", IncomeController.get_incomes);

// List total of incomes
routes.get("/total_incomes", IncomeController.get_total_incomes);

// List total of incomes grouped by account
routes.get("/total_incomes/by_account", IncomeController.account_total_incomes);

// --------------------------------------------- //

// --------- Routes related to Expenses --------- //

// Register a new expense
routes.post("/register_expense", ExpensesController.register_expense);

// Edit expense
routes.put("/edit_expense/:id", ExpensesController.edit_expense);

// Remove an expense
routes.delete("/delete_expense/:id", ExpensesController.delete_expense);

// List expenses with options
routes.get("/get_expenses", ExpensesController.get_expenses);

// List total of expenses
routes.get("/total_expenses", ExpensesController.get_total_expenses);

// List total of expenses grouped by account
routes.get(
  "/total_expenses/by_account",
  ExpensesController.account_total_expenses
);

// Bank Transfer
routes.post("/bank_transfer", ExpensesController.bank_transfer);

// --------------------------------------------- //

module.exports = routes;
