const mongoose = require('mongoose');

const Connect = async () =>{
    try{
        const uri ='mongodb+srv://user:admin123@sandbox.lyuw6.mongodb.net/gestion-de-livraison?retryWrites=true&w=majority';
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

