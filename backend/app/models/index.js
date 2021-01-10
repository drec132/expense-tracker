const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./expense.users.js")(mongoose);
db.expenses = require("./expense.expenses.js")(mongoose);
db.categories = require("./expense.categories.js")(mongoose);

module.exports = db