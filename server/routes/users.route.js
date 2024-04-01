const express = require('express')
const router =  express.Router()
const {getUsers,getSpecificUser,createUser,updateUser,deleteUser} = require('../controllers/users.controler')
const {storage} = require('../utils/storage')
const multer = require('multer')
const upload = multer({storage})
router.get("/" , getUsers)
router.get('/:userId',getSpecificUser)
router.post('/', createUser)
router.put('/:userId', upload.single("avatar") ,updateUser)
router.delete('/:userId',deleteUser)

module.exports = router;

