const Livreur=require('../controllers/livreur.controller')
const Livraison=require('../controllers/livraison.controlller')
const Prime=require('../controllers/prime.controller')
const authJwt=require('../middlewares/authJwt')

// simple route
module.exports =(app)=>{

   app.post("/livreur/signin",authJwt.isLivreur, Livreur.signin);
   app.get("/livreur/livraisonsDisponibles/:id",Livraison.findLivraisonsDisponibles);
   app.put("/livreur/validateLivraison",Livraison.validateLivraison);
   app.get("/livreur/livraisonsOfLivreur/:id",Livraison.getLivraisonsOfLivreur);
   app.put("/livreur/finaliserLivraison/:id",Livraison.finaliserLivraison);
   app.get('/livreur/getPrimes/:id',Prime.getPrimes)



}

