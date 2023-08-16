
const { register, login, getUser, deleteUser } = require('../controller/userController');
const { Authorize } = require('../middleware/Authentication');

const router = require ('express').Router()


router.post ('/register', register);
router.post ('/login', login);
router.get('/getProfile', getUser);
router.delete('/deleteProfile/:id', deleteUser)

module.exports=router