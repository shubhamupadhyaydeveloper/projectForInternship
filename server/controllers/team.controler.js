const { default: mongoose } = require('mongoose');
const Team = require('../models/team.model');

const createTeam = async (req,res) => {
    try {
        const {members} = req.body;
        if(!members) return res.status(400).json({error : 'member is empty or missing'})
        // logic for uniqueusers
        const domains = new Set();
        const uniqueUsers = [];
        members.forEach(user => {
            if (!domains.has(user.domain) && user.available) {
              domains.add(user.domain);
              uniqueUsers.push(user);
            }
          });
        const newTeam = new Team({
            members : uniqueUsers
        })
        await newTeam.save()
        res.status(200).json({messagge :"team created"})
    } catch (error) {
        console.log('Error in getTeam',error.message)
    }
}

const getSpecificTeam = async (req,res) => {
    try {
      const {teamId} = req.params;
      if(!mongoose.Types.ObjectId.isValid(teamId)) return res.status(400).json({error : 'Id is not valid'})
      const team = await Team.findById(teamId)
      if(!team) return res.status(404).json({error : 'Team is not found'})
      res.status(200).json(team)
    } catch (error) {
        console.log('Error in getSpecificTeam',error.message)
    }
}

const getAllTeams = async (req,res) => {
   try {
      const allTeams = await Team.find({})
      res.status(200).json(allTeams)
   } catch (error) {
     console.log('Error in getAllteams',error.message)
   }
}

module.exports = {createTeam,getSpecificTeam ,getAllTeams}