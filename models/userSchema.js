const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    createAd:{
        type: Date,
        default:Date.now
    },
    updatedAd:{
        type: Date,
        default:Date.now
    }
});

module.exports= mongoose.model("User", userSchema)