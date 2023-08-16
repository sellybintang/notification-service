const Notification = require ('../models/notificationSchema')
const {notificationQueue} = require ('../lib/notificationQueue')
const{User}= require ('../models/userSchema')
const amqplib = require('amqplib');


exports.createNotification = async (req,res) =>{
    try{
        const {user_id, message, delivery_preference, schedule_time, is_sent} = req.body;
        // console.log(req.body)

        if(!user_id || !message|| !delivery_preference || !schedule_time || is_sent===undefined){
            return res.status(401).json({
                status:'Failed',
                message:'Notification data is missing'
            })
        }

        const user = await User.find(u=> u.id === user_id)
        
        if (!user){
            return res.status(404).json({
                status:'Failed',
                message:'User not found'
            })
        }
        const notificationData={
            user_id, 
            message, 
            delivery_preference, 
            schedule_time, 
            is_sent: is_sent||false 
        }
        console.log(notificationData)

        const connection = await amqplib.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        queueName = 'notification_queue';

        await channel.assertQueue(queueName, {durable: true});
        const notificationBuffer = Buffer.from(JSON.stringify(notificationData));


        channel.sendToQueue(queueName, notificationBuffer,{persistent:true});

        await channel.close();
        await connection.close();

        res.status(200).json({
            status: 'Succes',
            message:'notification sent to queue'
        })
    } catch (error) {
        console.error('Koneksi RabbitMQ gagal:', error);
    }
}


exports.getNotification = async(req,res)=>{
    try{
        const connection = await amqplib.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        const queueName = 'notification_queue';
        await channel.assertQueue(queueName, {durable:true});

        const notification=[];


        console.consume(queueName,(msg)=>{
            if(msg !==null){
                const notification = JSON.parse(msg.content.toString());
                notification.push(notification);
                channel.ack(msg)


                setTimeout(()=>{
                    res.json(notification);
                    connection.close();
                },5000)
            }
        })
    } catch (error) {
        console.error('Koneksi RabbitMQ gagal:', error);
    }
}











// exports.createNotification = async (req, res) =>{
//     try{
//         // const userId= await User.findOne()
//         const {
//             user_id,
//             message,
//             delivery_preference,
//             schedule_time,
//         }= req.body

//         const newNotification = await Notification.create ({
//             user_id,
//             message,
//             delivery_preference,
//             schedule_time,
//             is_sent:false
//         });

//         await notificationQueue(newNotification);
//         res.status(200).json({
//             status: 'Succes',
//             message:'Succesfully', newNotification
//         })
//     }catch(err){
//         res.status.json({
//             status:'Failed',
//             message:err.message
//         })

//     }
// };

// exports.readNotification = async(req,res)=>{
//     try{
//         const readAllNotification = await Notification.find()
//             res.status(200).json({
//                 status:'Succes',
//                 message:'Succesfully', readAllNotification
//             })
//     }catch(err){
//         res.status(500).json({
//             status: 'Error',
//             message:err.message
//         })
//     }
// };

// exports.updateNotification = async (req, res)=>{
//     try{
//         const id = req.params.id
//         const{
//             user_id,
//             message,
//             delivery_preference,
//             schedule_time,
//             is_sent
//         } = req.body
//         const updateNewNotification = await Notification.findByIdAndUpdate(id,{user_id:user_id, message:message, delivery_preference:delivery_preference, schedule_time:schedule_time, is_sent:is_sent},{new:true})

//         await notificationQueue(updateNewNotification)
//         res.status(200).json({
//             status:'Succes',
//             message:'Succesfully', updateNewNotification
//         })
//     }catch{
//         res.status(500).json({
//             status:'Error',
//             message:err.message
//         })
//     }
// };

// exports.deleteNotification = async (req, res)=>{
//     try{
//         const id = req.params.id
//         const deleteNewNotification = await Notification.findByIdAndDelete(id)
//         res.status(200).json({
//             status:'Succes',
//             message:'Succesfully', deleteNewNotification
//         })
//     }catch{
//         res.status(500).json({
//             status:'Error',
//             message:err.message
//         })
//     }
// };



