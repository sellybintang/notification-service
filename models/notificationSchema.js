const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true
    },
    delivery_preference:{
        type: [String],
        required: true
    },
    schedule_time:{
        type: Date,
        required: true
    },
    is_sent:{
        type: Boolean
    }
});

module.exports= mongoose.model("Notification", notificationSchema)