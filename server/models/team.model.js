const mongoose = require('mongoose')
const User = require('./user.model')

const teamSchema = new mongoose.Schema({
    members : {
        type : [User.schema]
    }
})

const Team = mongoose.model('Team',teamSchema)
module.exports = Team;