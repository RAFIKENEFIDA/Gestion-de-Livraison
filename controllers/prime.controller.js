
const config = require("../config/auth.config");
const Livraison= require('../models/livraison');
const Vehicule= require('../models/vehicule');
const Prime= require('../models/prime');
const Livreur=require('../models/livreur');

// get prims

exports.getPrimes=async(req, res)=>{
    

    // get if existe pime laste month
    
    let today = new Date();

    let year=String(today.getFullYear());
    let month=String(today.getMonth()).padStart(2, "0");

    let Month=month+'-'+year;
    console.log(Month);
   
    let primeLastMontawait =  await Prime.where("livreurId").equals(req.params.id).where("moins").equals(Month);
    
    if( primeLastMontawait.length= 0){
    
           let livraisonForLastMonth=await Livraison.where("livreurId").equals(req.params.id).where("date_arrivee");
    }

    let Primes=await Prime.where("livreurId").equals(req.params.id);

    if(Primes.length>0){

        res.status(200).send({data:Primes});
  
      }else{
        res.status(500).send({message:"aucun prime"});
  
      }

}