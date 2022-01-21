const config = require("../config/auth.config");
const Livreur= require('../models/livreur');
const Communcontroller=require('./commun.controller')


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// signin for admin

exports.signin=(req, res)=>{

    // check admin if exist by email
    Livreur.findOne({
        email:req.body.email,
    }).exec((err, livreur)=>{ 
       
        // if error retun error
        if(err){
         res.status(500).send({ message: err });
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

         res.status(200).send({
           token:token,
           livreur:livreur,
         });

    })
    
       
}

