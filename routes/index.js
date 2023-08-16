const notificationRoutes = require('./notificationRoutes')
const userRoutes = require('./userRoutes')
const router = require ('express').Router()


router.use ('/notifications', notificationRoutes)

router.use('/notifications', userRoutes)

module.exports=router