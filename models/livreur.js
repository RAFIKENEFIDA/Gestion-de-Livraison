const mongoose = require("mongoose");

const Livreur = mongoose.model(
  "Livreur",
   new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role:{
        type: String,
        default: "livreur"
    },
    responsableLivraisonId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResponsableLivraison"
      }
    
   
  })
);

module.exports = Livreur;