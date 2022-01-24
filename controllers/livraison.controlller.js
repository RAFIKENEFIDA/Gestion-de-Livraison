
const config = require("../config/auth.config");
const Livraison= require('../models/livraison');
const Vehicule= require('../models/vehicule');
const Livreur=require('../models/livreur');
const Communcontroller=require('./commun.controller')
const logger=require('../config/logger');
const distanceProvider=require('../helpers/distanceProvider')


// Create and Save a new Livraison
exports.create = async (req, res) => {

  try{

    let data=req.body;
    // get the vehicule
    let vehicule;

    if(data.quantite<=200){
        vehicule="voiture";
    }
   else if( 200< data.quantite<=800){
        vehicule="petit camion";
    }
    else if( 800< data.quantite<=1600){
        vehicule="grand camion";
    }
    else if( data.zone!="maroc"){
        vehicule="avion";
    }


    let vehiculeId=  await  Vehicule.findOne({
        nom:vehicule
      }).exec( );


    //  calcule the price of livraison
   
    // get price by kiloo

    let prix;
    let montantParKillo;

    if(data.zone=="maroc"){
        montantParKillo=40;
    }
   else  if (data.zone=="europe"){
        montantParKillo=160;
    }
   else  if (data.zone=="amerique"){
        montantParKillo=220;
    }
   else  if (data.zone=="asia"){
        montantParKillo=240;
    }
   else  if (data.zone=="australie "){
        montantParKillo=260;
    }

    if(data.quantite<=3){
        prix=data.quantite*montantParKillo;
    }
    else if( data.quantite>3){

        prix=3*montantParKillo;
        prix+=(data.quantite-3)*(5);
    }

    // get the distance

   let distance = await distanceProvider.getDistance(data.depart,data.arrivee)

    const livraison= await new Livraison({
        depart:data.depart,
        arrivee:data.arrivee,
        zone:data.zone,
        status:"encore",
        date_depart:data.date_depart,
        date_arrivee:"",
        distance:distance,
        quantite:data.quantite,
        prix:prix,
        ResponsableLivraisonId:data.ResponsableLivraisonId,
        vehiculeId:vehiculeId.id
    });

    // ajouter la livraison
    
    await livraison.save((err, livraison)=>{
    
        if(err){
            res.status(500).send({message:err})
        }
        // res.send({ message: "livraison was registered successfully!" });

    })

    // send email to livreur

    let livreurs=await Livreur.find({vehiculeId:vehiculeId.id});

     livreurs.forEach(livreur=>{
         
        
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testcoding975@gmail.com',
          pass: 'testCoding1998'
        }
      });    
      var mailOptions = {
        from: 'testcoding975@gmail.com',
        to: livreur.email,
        subject: 'Vous avez une nouveau livraison',
        text:'Vous avez une nouveau livraison le : '  +data.date_depart  +  '  de  ' + data.depart + '  vers  '   +data.arrivee + '   la livraison contient :  ' + data.quantite + '  kg'  
      };
      
      transporter.sendMail(mailOptions, function(error, info){
          if (err) {
              return log('Error occurs');
          }
      });

        
     })

     logger.info("livraison "+ livraison._id  +"est bien enregistrer ");

     res.send({message:"livraison est bien enregistrer"});

  }catch(err){
      logger.error(err.message);
  }

};

// recupere livraison for livreur
exports.findLivraisonsDisponibles=async (req, res)=>{

  try {

    let dataLivreur=await Livreur.findById(req.params.id);

    let Livraisons=await Livraison.where("status").equals("encore").where("vehiculeId").equals(dataLivreur.vehiculeId).populate("vehiculeId");
    res.status(200).send({livraisons:Livraisons});

  }catch (err) {

    console.error(err.message);

  }

};

// Retrieve all Livraisons from the database.
exports.findAll = (req, res) => {

  try{

    Livraison.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Livraisons."
      });
    });


  }catch (err) {
    logger.error(err.message);
  }

  
};

// Find a single Livraison with an id
exports.findOne = (req, res) => {


  try{
    const id = req.params.id;

    Livraison.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "livraiso not found!" });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Livraison "});
      });



  }catch (err) {
    logger.error(err.message);
  }


  
};

// get livraisons of livreur

exports.getLivraisonsOfLivreur=async(req, res)=>{

  try{

    let Livraisons=await Livraison.where("livreurId").equals(req.params.id).populate("vehiculeId");
    if(Livraisons.length>0){

      res.status(200).send({data:Livraisons});

    }else{
      res.status(500).send({message:"aucun livraison"});

    }

  }catch (err) {
    logger.error(err.message);
  }

}

// finaliser livraison

exports.finaliserLivraison=async (req, res)=>{

  try{
    
    const data={
      status:"finaliser",
      date_arrivee:req.body.date_arrivee,
    };

    Livraison.findByIdAndUpdate(req.params.id, data)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Livraison was not found!`
          });
        } else
        logger.info("livraison "+ req.params.id  +"est bien finaliser ");
         res.send({ message: "Livraison est bien finaliser." });
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });

  }catch (err) {

    logger.error(err.message);
  }

}

// Update a Livraison by the id in the request
exports.update = (req, res) => {

  try{


    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Livraison.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Livraison was not found!`
          });
        } else res.send({ message: "Livraison was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });



    

  }catch (err) {
    logger.error(err.message);
  }

 
};
 
// Validate livraison by livreur

exports.validateLivraison=(req, res)=>{
  
  try{
   

    const data={
      status:"valider",
      date_depart:req.body.date_depart,
      livreurId:req.body.livreurId
    };


      
    Livraison.findByIdAndUpdate(req.body.livrasionId, data)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Livraison was not found!`
          });
        } else 
        logger.info("livraison "+ req.body.livrasionId  +"est valider");
        res.send({ message: "Livraison est bien valider." });
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });

  }catch (err) {

    console.log(err.message);
  }

}


// Delete a Livraison with the specified id in the request

exports.delete = (req, res) => {

  try{

    let id=req.params.id;

    Livraison.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Livraison was not found!`
          });
        } else {
          res.send({
            message: "Livraison was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
    
    

  }catch (err) {
    logger.error(err.message);

  }


  
};

