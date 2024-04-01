const express = require('express')
const router =  express.Router()
const {getUsers,getSpecificUser,createUser,updateUser,deleteUser} = require('../controllers/users.controler')
router.get("/" , getUsers)
router.get('/:userId',getSpecificUser)
router.post('/', createUser)
router.put('/:userId',updateUser)
router.delete('/:userId',deleteUser)

module.exports = router;

