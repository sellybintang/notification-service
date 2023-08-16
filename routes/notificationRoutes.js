const { createNotification } = require('../controller/notificationController')

const router = require ('express').Router()


router.post ('/notification', createNotification)

module.exports=router