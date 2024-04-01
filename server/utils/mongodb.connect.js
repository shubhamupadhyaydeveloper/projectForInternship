const mongoose = require("mongoose")

async function calldb () {
    try {
      await mongoose.connect(`${process.env.MONGO_URL}`)
      console.log("you connected to mongoose")
    } catch (error) {
        console.log(error.message)
    }
}
 
module.exports = calldb; 