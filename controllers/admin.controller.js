const config = require("../config/auth.config");
const Admin= require('../models/admin');
const Manager= require('../models/manager');
const Communcontroller=require('../controllers/commun.controller')



var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// signup for admin

exports.signup=(req, res)=>{

    const admin=new Admin({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    });

    admin.save((err, admin)=>{

        if(err){
            res.status(500).send({message:err})
        }
    })
    res.send({ message: "User was registered successfully!" });

}

// signin for admin

exports.signin=(req, res)=>{

    // check admin if exist by email
    Admin.findOne({
        email:req.body.email,
    }).exec((err, admin)=>{ 
       
        // if error retun error
        if(err){
         res.status(500).send({ message: err });
        }
        // if deosn't exist return response is not found
        if(!admin){
            res.status(500).send({ message: "Email or Password Invalid" });
        }
        // check password if correct, by comparing passwords
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            admin.password
          );
     
        // return invalid password if passwords doesn't identique  
    
          if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
          };

         var token=jwt.sign({id:admin.id},config.secret,{
            expiresIn: 86400, // 24 hours
         })

         var authorities = [];

         req.session.token = token;

         res.status(200).send({
           token:token,
           admin:admin,
         });

    })
    
       
}
// create acount for manager

exports.addManager=async (req,res)=>{

    var data=req.body;
    var generatPassword=Math.random().toString(36).substr(2) + req.body.prenom.split("@", 1);
    var password = bcrypt.hashSync(generatPassword, 8)
    data.password=password;
  
    const manager= await new Manager({
      nom:req.body.nom,
      prenom:req.body.prenom,
      email:req.body.email,
      password:password
  });
  console.log(generatPassword)
  
  await manager.save((err, manager)=>{
  
      if(err){
          res.status(500).send({message:err})
      }
  })
  res.send({ message: "Manager was registered successfully!" });
    
    Communcontroller.sendEmail(generatPassword);
  
  }




