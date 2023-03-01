const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model")(mongoose);
db.users = require("./user.model")(mongoose);
db.news = require("./news.model")(mongoose);

module.exports = db;