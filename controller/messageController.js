const amqplib = require ('amqplib');
const Message = require ('../models/messageSchema');


exports.createMessage = async (req, res) =>{
    try{
        const {
            user_id,
            message,
            delivery_preference,
            schedule_time,
        }= req.body

        const newMessage = await Message.create ({
            user_id,
            message,
            delivery_preference,
            schedule_time,
            is_sent:false
        });

        await Queue.addMessagetoQueue(newMessage);
        res.status.json({
            status: 'Succes',
            message:'Succesfully', newMessage
        })
    }catch(err){
        res.status.json({
            status:'Failed',
            message:err.message
        })

    }
};

exports.readMessage = async(req,res)=>{
    try{
        const readAllMessage = await Message.find()
            res.status(200).json({
                status:'Succes',
                message:'Succesfully', readAllMessage
            })
    }catch(err){
        res.status(500).json({
            status: 'Error',
            message:err.message
        })
    }
};

exports.updateMessage = async (req, res)=>{
    try{
        const id = req.params.id
        const{
            user_id,
            message,
            delivery_preference,
            schedule_time,
            is_sent
        } = req.body
        const updateNewMessage = await Message.findByIdAndUpdate(id,{user_id:user_id, message:message, delivery_preference:delivery_preference, schedule_time:schedule_time, is_sent:is_sent})
        res.status(200).json({
            status:'Succes',
            message:'Succesfully', updateNewMessage
        })
    }catch{
        res.status(500).json({
            status:'Error',
            message:err.message
        })
    }
};

exports.deleteMessage = async (req, res)=>{
    try{
        const id = req.params.id
        const deleteNewMessage = await Message.findByIdAndDelete(id)
        res.status(200).json({
            status:'Succes',
            message:'Succesfully', deleteNewMessage
        })
    }catch{
        res.status(500).json({
            status:'Error',
            message:err.message
        })
    }
};