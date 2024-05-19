require('dotenv').config()
const mongoose = require("mongoose")


const connection = mongoose.connect(process.env.mongoDB_URL)


module.exports ={
    connection
}