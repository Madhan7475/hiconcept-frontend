const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  message: String
});

module.exports = mongoose.model("Contact", ContactSchema);