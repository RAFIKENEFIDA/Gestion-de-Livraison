const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Admin = require("../models/admin");
const Manager = require("../models/manager");
const ResponsableLivraison = require("../models/responsableLivraison");
const Livreur = require("../models/livreur");


verifyToken = (req, res, next) => {
    let token = req.session.token;
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  };

  isAdmin=(req, res, next)=>{

    Admin.findOne({
        email:req.body.email
    }).exec((err,admin)=>{
        if(err){
            res.status(500).send({ message:err});
        }

        if( admin==null ){
            res.send({ message:"Invalid email"})
        }
        if(admin.role==="admin"){
            next();
        }else{
            res.status(403).send({ message: "vous etes pas un admin" });

        }
    })
  };
  isManager=(req, res, next)=>{

    Manager.findOne({
        email:req.body.email
    }).exec((err,manager)=>{
        if(err){
            res.status(500).send({ message:err});
        }

        if( manager==null ){
            res.send(404).send({ message:"Invalid email"})
        }
        
        if(manager.role==="manager"){
            next();
        }else{
            res.status(403).send({ message: "vous etes pas un manager" });

        }
    })
  };
  
  isResponsableLivraison=(req, res, next)=>{

    ResponsableLivraison.findOne({
        email:req.body.email
    }).exec((err,responsableLivraison)=>{
        if(err){
            res.status(500).send({ message:err});
        }

        if( responsableLivraison==null ){
            res.send({ message:"Invalid email"})
        }
        
        if(responsableLivraison.role==="responsableLivraison"){
            next();
        }else{
            res.status(403).send({ message: "vous etes pas un ResponsableLivraison" });

        }
    })
  };

  isLivreur=(req, res, next)=>{

    Livreur.findOne({
        email:req.body.email
    }).exec((err,livreur)=>{
        if(err){
            res.status(500).send({ message:err});
        }

        if( livreur==null ){
            res.send({ message:"Invalid email"})
        }
        
        if(livreur.role==="livreur"){
            next();
        }else{
            res.status(403).send({ message: "vous etes pas un livreur" });

        }
    })
  };

  const authJwt = {
    verifyToken,
    isLivreur,
    isManager,
    isResponsableLivraison,
    isAdmin,
    
  };
  module.exports = authJwt;