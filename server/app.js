require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const connectToMongodb  = require('./utils/mongodb.connect')
const usersRoute = require('./routes/users.route')
const teamRoute = require('./routes/teams.route')

// middlewares
app.use(express.json())

// routes for api
app.use('/api/users',usersRoute);
app.use('/api/team', teamRoute)
app.get('/', (req ,res) => {
    res.send("Hi welcome to chat app")
})

 
app.listen(port,() => {
    connectToMongodb()
    console.log(`server is listning on ${port}`)
}) 