const mongoose = require("mongoose");

const Livraison = mongoose.model(
  "Livraison",
   new mongoose.Schema({
    depart: String,
    arrivee: String,
    zone: String,
    status: String,
    date_depart: String,
    date_arrivee: String,
    distance: Number,
    quantite: Number,
    prix: Number,
    livreurId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Livreur"
      },
      vehiculeId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicule"
      },
      ResponsableLivraisonId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResponsableLivraison"
      }
    
   
  })
);

module.exports = Livraison;