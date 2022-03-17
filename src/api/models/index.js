const config = require("../config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  operatorsAliases: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;