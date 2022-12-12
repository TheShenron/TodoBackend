const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
})

const UserModel = mongoose.model('user' , userSchema)

module.exports = { UserModel }