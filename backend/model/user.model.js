const mongoose = require("mongoose")

const userSchma = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }, 
    role:{
        type:String, 
        enum:["admin", "user"], 
        default:"user"
    }
})


const userModel = mongoose.model("/user", userSchma)

module.exports = {
    userModel
}