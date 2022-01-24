const mongoose = require("mongoose");

const Vehicule = mongoose.model(
  "Vehicule",
   new mongoose.Schema({
    nom: String,

  })
);

module.exports = Vehicule;