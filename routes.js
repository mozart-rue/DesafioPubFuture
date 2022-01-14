const express = require("express");
const routes = express.Router();

const AccountController = require("./app/controllers/AccountController");

// --------- Routes related to Account --------- //

// Create a new account
routes.post("/create_account", AccountController.create_account);

// --------------------------------------------- //

module.exports = routes;
