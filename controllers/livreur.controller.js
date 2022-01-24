const config = require("../config/auth.config");
const Livreur= require('../models/livreur');
const Vehicule= require('../models/vehicule');
const Communcontroller=require('./commun.controller')
const logger=require('../config/logger');



var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// signin for admin

exports.signin=(req, res)=>{

  try{

     // check admin if exist by email
     Livreur.findOne({
      email:req.body.email,
  }).exec((err, livreur)=>{ 
     
      // if error retun error
      if(err){
       res.status(500).send({ message: err });
       logger.error(message);

      }
      // if deosn't exist return response is not found
      if(!livreur){
          res.status(500).send({ message: "Email or Password Invalid" });
      }
      // check password if correct, by comparing passwords
      var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          livreur.password
        );
   
      // return invalid password if passwords doesn't identique  
  
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        };

       var token=jwt.sign({id:livreur.id},config.secret,{
          expiresIn: 86400, // 24 hours
       })

       var authorities = [];

       req.session.token = token;
      
       logger.info("livreur  ayant id "+livreur._id+" est conecter");

       res.status(200).send({
         token:token,
         livreur:livreur,
       });

  })


  }catch(err){
      logger.error(err.message);
  }
    
}

// create acount for responsable

exports.addLivreur=async (req,res)=>{

  try{

     // get idVehicule by nom 
  let vehicule=  await  Vehicule.findOne({
    nom:req.body.vehicule
  }).exec( );


  var data=req.body;
  var generatPassword=Math.random().toString(36).substr(2) + req.body.prenom.split("@", 1);
  var password = bcrypt.hashSync(generatPassword, 8)
  data.password=password;

  const livreur= await new Livreur({
    nom:req.body.nom,
    prenom:req.body.prenom,
    email:req.body.email,
    password:password,
    responsableLivraisonId:req.body.responsableLivraisonId,
    vehiculeId:vehicule.id
});

await livreur.save((err, livreur)=>{

    if(err){
        res.status(500).send({message:err})
        logger.error(err);

    }
})

logger.info("livreur "+ livreur._id  +"est bien enregistrer ");

res.send({ message: "livreur was registered successfully!" });
  
  Communcontroller.sendEmail(generatPassword,data.email);

  }catch(err){
      logger.error(err.message);
  }

 

}

