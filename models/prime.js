const mongoose = require("mongoose");

const Prime = mongoose.model(
  "Prime",
   new mongoose.Schema({
    prime: Number,
    mois: String,
    distance: Number,
    livreurId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livreur"
      }
    
   
  })
);

module.exports = Prime;