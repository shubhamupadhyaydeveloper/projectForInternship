require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const connectToMongodb  = require('./utils/mongodb.connect')
const usersRoute = require('./routes/users.route')
const teamRoute = require('./routes/teams.route')
const cloudinary = require('cloudinary').v2

// middlewares
app.use(express.json())

// routes for api
app.use('/api/users',usersRoute);
app.use('/api/team', teamRoute)
app.get('/', (req ,res) => {
    res.send("Hi welcome to chat app")
})

// cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_KEY,
    api_secret : process.env.CLOUD_SECRET
})
 
app.listen(port,() => {
    connectToMongodb()
    console.log(`server is listning on ${port}`)
}) 