const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

module.exports = sequelize;
