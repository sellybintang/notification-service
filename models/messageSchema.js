const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    notification_id:{
        type: String,
        required: true,
    },
    queue_time:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports= mongoose.model("Message", messageSchema)