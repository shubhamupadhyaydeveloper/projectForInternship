const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstname : {
        type : String,
        required : [true,'firstname is required'],
    },
    lastname : {
        type : String,
        required : [true ,'lastname is required'],
    },
    email: {
        type : String,
        required : [true , 'email is required']
    },
    gender : {
        type : String,
        required : true,
        enum : ["male","female"]
    },
    avatar : {
        type : String,
        default : ''
    },
    domain : {
        type : String,
        required : [true , 'domain is required']
    },
    available : {
        type : Boolean,
        required : [true,'This field is required']
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema)

module.exports = User;