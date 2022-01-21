const mongoose = require("mongoose");

const ResponsableLivraison = mongoose.model(
  "ResponsableLivraison",
   new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    password: String,
    role:{
        type: String,
        default: "responsableLivraison"
    },
    managerId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager"
      }
    
   
  })
);

module.exports = ResponsableLivraison;