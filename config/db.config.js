const mongoose = require('mongoose');
require('dotenv').config()


const Connect = async () =>{
    try{
        const uri =process.env.MONGODB;
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('connected to mongodb   gestion de livraison')

    }catch(err){
        console.log(err)

    }
}
Connect();

