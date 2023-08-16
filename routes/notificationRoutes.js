const { createNotification, readNotification, updateNotification, deleteNotification, getNotification } = require('../controller/notificationController')
const { Authorize } = require('../middleware/Authentication')

const router = require ('express').Router()


router.post ('/', Authorize, createNotification)
router.get ('/read', Authorize, getNotification)
// router.patch('/update', updateNotification)
// router.delete('/delete/:id', deleteNotification)

module.exports=router