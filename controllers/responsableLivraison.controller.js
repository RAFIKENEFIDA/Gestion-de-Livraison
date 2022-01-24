const config = require("../config/auth.config");
const ResponsableLivraison= require('../models/responsableLivraison');
const Livreur= require('../models/livreur');
const Communcontroller=require('../controllers/commun.controller')

const Vehicule= require('../models/vehicule');


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// signin for admin

exports.signin=(req, res)=>{

    // check admin if exist by email
    ResponsableLivraison.findOne({
        email:req.body.email,
    }).exec((err, responsableLivraison)=>{ 
       
        // if error retun error
        if(err){
         res.status(500).send({ message: err });
        }
        // if deosn't exist return response is not found
        if(!responsableLivraison){
            res.status(500).send({ message: "Email or Password Invalid" });
        }
        // check password if correct, by comparing passwords
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            responsableLivraison.password
          );
     
        // return invalid password if passwords doesn't identique  
    
          if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
          };

         var token=jwt.sign({id:responsableLivraison.id},config.secret,{
            expiresIn: 86400, // 24 hours
         })

         var authorities = [];

         req.session.token = token;

         res.status(200).send({
           token:token,
           responsableLivraison:responsableLivraison,
         });

    })
    
       
}




// create acount for responsable

exports.addResponsableLivraison=async (req,res)=>{

  var data=req.body;
  var generatPassword=Math.random().toString(36).substr(2) + req.body.prenom.split("@", 1);
  var password = bcrypt.hashSync(generatPassword, 8)
  data.password=password;

  const responsableLivraison= await new ResponsableLivraison({
    nom:req.body.nom,
    prenom:req.body.prenom,
    email:req.body.email,
    password:password,
    managerId:req.body.managerId
});

await responsableLivraison.save((err, responsableLivraison)=>{

    if(err){
        res.status(500).send({message:err})
    }
})
res.send({ message: "ResponsableLivraison was registered successfully!" });
  
  Communcontroller.sendEmail(generatPassword,data.email);

}


