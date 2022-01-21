const mongoose = require("mongoose");

const Manager = mongoose.model(
  "Manager",
  new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role:{
        type: String,
        default: "manager"
    }
   
  })
);

module.exports = Manager;