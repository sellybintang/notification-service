const User = require ('../models/userSchema')
const bcrypt = require ('bcrypt');
const crypto = require('crypto-js')
// create token

const generateToken = async(payload) => {
    const data = JSON.stringify(payload)
    return crypto.AES.encrypt(data, 'ASC').toString()
}

exports.register = async (req, res) =>{
    try{
        const email= req.body.email

        const user = await User.findOne({email:email})
        if(user){
            return res.status(401).json({
                status:'Failed',
                message:'Sorry your email have been exist'
            })
        }
        const{name, password}= req.body
        const salt = await bcrypt.genSalt(10)
        const hashingPassword = await bcrypt.hash(password, salt);
        // console.log(hashingPassword)
        const newUser = await User.create ({name:name, email , password:hashingPassword });
        res.status(200).json({
            status: 'Succes',
            message:'Succesfully', newUser
        })
    }catch(err){
        res.status(500).json({
            status:'Failed',
            message:err.message
        })

    }
};

exports.login = async (req, res)=>{
    try{
        const email= req.body.email.toLowerCase()
        const password = req.body.password
        // console.log(password)
        const is_email = await User.findOne({email:email})
        // console.log(is_email.id)
        const is_password = await User.findOne({password:password})
        if(!is_email){
            return res.status(400).json({
                status:'Failed',
                message: 'wrong email'
            })
        }

        const cekPassword = await bcrypt.compare(password, is_email.password)
       
        if(!cekPassword){
            return res.status(401).json({
                status: "failed",
                message:"wrong password"       
            })
        }
        const token = await generateToken({
            user_id: is_email.id
        });


        res.status(200).json({
            status:"Succes",
            message: "Succesfully to login", data: {name:is_email.name,
            email:is_email.email,
            token:token}
        })
    }catch(err){
        res.status(500).json({
            status:"Failed",
            message: err.message
        })
    }
};

exports.getUser = async (req, res)=>{
    try{
        const getAllUser = await User.find()
        res.status(200).json({
            status: "Succes",
            message:"Succes to find all user", getAllUser
    })
    }catch(err){
        res.status(500).json({
            status:"Failed",
            message: err.message
        })
    }

};

exports.deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteIdUser = await User.findByIdAndDelete(id)
        res.status(200).json({
            status:"Succes",
            message:"Succes to delete user", deleteIdUser
        })
    }catch(err){
        res.status(500).json({
            status:"Failed",
            message: err.message
        })
    }
};
