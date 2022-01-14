require("dotenv").config();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

module.exports = {
  dialect: "postgres",
  host: `${host}`,
  // port: '',
  username: `${username}`,
  password: `${password}`,
  database: "pubfinancial",
  define: {
    timestamps: true,
    underscored: false,
  },
};
