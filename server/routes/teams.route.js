const express = require('express')
const router = express.Router()
const {createTeam,getSpecificTeam,getAllTeams} = require('../controllers/team.controler')

router.post("/" , createTeam)
router.get('/:teamId',getSpecificTeam)
router.get('/',getAllTeams)

module.exports = router;