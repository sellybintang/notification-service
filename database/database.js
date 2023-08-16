const mongoose = require('mongoose');
const dotenv = require ('dotenv');
dotenv.config();
const {DB_MONGO,}=process.env;

const database = module.exports=()=>{
    try{
        mongoose.connect(DB_MONGO);
        console.log("Connected to Mongodb");
    }catch(err){
        console.log("failed");
    }
}

module.exports= database