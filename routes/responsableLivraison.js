const ResponsableLivraison=require('../controllers/responsableLivraison.controller')
const Livreur=require('../controllers/livreur.controller')
const authJwt=require('../middlewares/authJwt')

// simple route
module.exports =(app)=>{

   app.post("/responsableLivraison/signin",authJwt.isResponsableLivraison, ResponsableLivraison.signin);
   app.post("/livreur/creatAcount", ResponsableLivraison.addLivreur);


}

