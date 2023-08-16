const express = require('express');
const multer = require('multer');
const database = require ('./database/database')
const router = require('./routes/index')
const body_parser= require('body-parser');
const app = express()
const port = process.env.PORT || 3009
const {notificationQueue} = require ('./lib/notificationQueue');



database()

app.use (express.json());
app.use(express.urlencoded({extended:false}));
app.use(body_parser.json());

app.use(router)



app.listen(port,async ()=>{
    console.log(`Express is listening on port ${port}`);
    await notificationQueue(notification);
})