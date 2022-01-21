
const CommmunController=require('../controllers/commun.controller')


module.exports =(app)=>{

    app.post("/signout", CommmunController.signout);

}

