const Notification = require ('../models/notificationSchema')


exports.createNotification = async (req, res) =>{
    try{
        const {
            user_id,
            message,
            delivery_preference,
            schedule_time,
        }= req.body

        const newNotification = await Notification.create ({
            user_id,
            message,
            delivery_preference,
            schedule_time,
            is_sent:false
        });

        await Queue.addNotificationtoQueue(newNotification);
        res.status.json({
            status: 'Succes',
            message:'Succesfully', newNotification
        })
    }catch(err){
        res.status.json({
            status:'Failed',
            message:err.message
        })

    }
};

exports.readNotification = async(req,res)=>{
    try{
        const readAllNotification = await Notification.find()
            res.status(200).json({
                status:'Succes',
                message:'Succesfully', readAllNotification
            })
    }catch(err){
        res.status(500).json({
            status: 'Error',
            message:err.message
        })
    }
};

exports.updateNotification = async (req, res)=>{
    try{
        const id = req.params.id
        const{
            user_id,
            message,
            delivery_preference,
            schedule_time,
            is_sent
        } = req.body
        const updateNewNotification = await Notification.findByIdAndUpdate(id,{user_id:user_id, message:message, delivery_preference:delivery_preference, schedule_time:schedule_time, is_sent:is_sent})
        res.status(200).json({
            status:'Succes',
            message:'Succesfully', updateNewNotification
        })
    }catch{
        res.status(500).json({
            status:'Error',
            message:err.message
        })
    }
};

exports.deleteNotification = async (req, res)=>{
    try{
        const id = req.params.id
        const deleteNewNotification = await Notification.findByIdAndDelete(id)
        res.status(200).json({
            status:'Succes',
            message:'Succesfully', deleteNewNotification
        })
    }catch{
        res.status(500).json({
            status:'Error',
            message:err.message
        })
    }
};



