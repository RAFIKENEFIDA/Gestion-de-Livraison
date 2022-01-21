const ManagerController=require('../controllers/manager.controller')
const ResponsableLivraison=require('../controllers/responsableLivraison.controller')
const authJwt=require('../middlewares/authJwt')

// simple route
module.exports =(app)=>{

   app.post("/manager/signin", authJwt.isManager,ManagerController.signin);
   app.post("/responsableLivraison/creatAcount", ManagerController.addResponsableLivraison);


}


