const mongoose = require("mongoose");

const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role:{
        type: String,
        default: "admin"
    }
   
  })
);

module.exports = Admin;