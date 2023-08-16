const User = require ('../models/userSchema')
const bcrypt = require ('bcrypt');


exports.register = async (req, res) =>{
    try{
        const {
            name,
            email,
            password
        }= req.body
        const salt = await bcrypt.genSalt(10)
        const hashingPassword = await bcrypt.hash(password, salt);
        // console.log(hashingPassword)
        const newUser = await User.create ({name:name, email:email, password:hashingPassword});
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
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                status:'Failed',
                message: 'wrong email'
            })
        }

        const cekPassword = await bcrypt.compare(password, user.password)
       
        if(!cekPassword){
            return res.status(401).json({
                status: "failed",
                message:"wrong password"       
            })
        }

        res.status(200).json({
            status:"Succes",
            message: "Succesfully to login", data: {name:user.name,
            email:user.email}
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
        const getAllUser = await User.findAll()
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
