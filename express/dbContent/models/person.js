const { DataTypes } = require("sequelize");
const db = require("../database");
const PersonSchema = db.define(
  "Person",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    job: DataTypes.STRING,
  },
  {}
);
module.exports = PersonSchema;
