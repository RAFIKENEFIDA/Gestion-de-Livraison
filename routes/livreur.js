const Livreur=require('../controllers/livreur.controller')
const authJwt=require('../middlewares/authJwt')

// simple route
module.exports =(app)=>{

   app.post("/livreur/signin",authJwt.isLivreur, Livreur.signin);

}

