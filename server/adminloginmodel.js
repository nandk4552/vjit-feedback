const mongoose = require("mongoose");

const adminlogin = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"], // Define possible roles
    default: "admin", // Set the default role to 'user'
  },
});

module.exports = mongoose.model("AdminLogin", adminlogin);
