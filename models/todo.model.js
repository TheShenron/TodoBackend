const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 3
    },
    isDone:{
        type: Boolean,
        default:false
    },
    tag:{
        type:String
    },
    parentID:String
})

const TodoModel = mongoose.model('todo' , todoSchema)

module.exports = { TodoModel }