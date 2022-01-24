const ResponsableLivraison=require('../controllers/responsableLivraison.controller')
const Livreur=require('../controllers/livreur.controller')
const authJwt=require('../middlewares/authJwt')
const Livraison=require('../controllers/livraison.controlller')

// simple route
module.exports =(app)=>{

   app.post("/responsableLivraison/signin",authJwt.isResponsableLivraison, ResponsableLivraison.signin);
   app.post("/livreur/creatAcount", Livreur.addLivreur);
   app.post("/livraison/create",Livraison.create);
   app.delete("/livraison/delete/:id",Livraison.delete);
   app.get("/livraison/findOne/:id",Livraison.findOne);
   app.get("/livraison/findAll",Livraison.findAll);
   app.put("/livraison/update/:id",Livraison.update);
}

