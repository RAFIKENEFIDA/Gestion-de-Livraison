const AdminController=require('../controllers/admin.controller')
const ManagerController=require('../controllers/manager.controller')
const authJwt=require('../middlewares/authJwt')

// simple route
module.exports =(app)=>{

   app.post("/admin/signup", AdminController.signup);
   app.post("/admin/signin", authJwt.isAdmin,AdminController.signin);
   app.post("/manager/creatAcount", AdminController.addManager);

}



