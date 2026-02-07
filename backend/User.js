const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  university: String
});

module.exports = mongoose.model("User", UserSchema);
