const amqplib = require('amqplib');

exports.notificationQueue = async (notification)=>{
    try{
        const connection = await amqplib.connect('amqp://localhost:5672')
        const channel = await connection.createChannel();

        const queueName = 'notification_queue';
        const notification = {
            recipient: 'user@example.com',
            message: 'This is a notification message',
          
          };
        await channel.assertQueue(queueName,{durable:true});

        const notificationBuffer= Buffer.from(JSON.stringify(notification));
        channel.sendToQueue(queueName, notificationBuffer,{persistent:true})

        // tutup koneksi
        await channel.close();
        await connection.close();
    }catch(error){
        console.error('Error adding notification to queue:', error);
    }
}