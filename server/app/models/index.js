const mongoose = require("mongoose");
const config = require("../config/db.config.js");

const db = {};

db.mongoose = mongoose;

db.user = require("../models/user.model.js");
db.role = require("../models/role.model.js");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
