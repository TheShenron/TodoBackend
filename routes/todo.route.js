const { Router } = require('express')
const todo = Router()

//Todo Model
const { TodoModel } = require('../models/todo.model')


//healper function
const { copmToken } = require('../middleware/genToken')

//Routes...


todo.post("/", async (req, res) => {

    const token = req.headers['authorization'].split(" ")[1]
    const query = req.query
    console.log(query)
    try {

        //veryfing token

        try {

            const tokenData = copmToken(token)

            query.parentID = tokenData.id


            //geting user todoList
            const Todolist = await TodoModel.find(query)
            console.log(Todolist)
            res.send({ msg: "ok", todo: Todolist })


        } catch (error) {
            return res.send("Unauthorization user")
        }



    } catch (error) {
        console.log(error)
        res.send({ msg: "Error in todo get request" })
    }

})



todo.post('/addtodo', async (req, res) => {

    const token = req.headers['authorization'].split(" ")[1]
    const todoData = req.body

    try {

        //veryfing token
        try {

            const tokenData = copmToken(token)

            //adding id in todo
            todoData.parentID = tokenData.id

            //adding todo in DB
            const newTodo = new TodoModel(todoData)
            await newTodo.save()

            res.send({ msg: "Todo Added" })


        } catch (error) {
            return res.send("Unauthorization user")
        }


    } catch (error) {
        console.log(error)
        res.send({ msg: "Error in addtodo" })
    }

})



todo.put("/update/:id", async (req, res) => {


    const id = req.params.id
    const updateData = req.body

    try {

        const isdelete = await TodoModel.findByIdAndUpdate({ _id: id } , updateData )

        if (isdelete === null) return res.send({ msg: "Id is Incorrect" })

        res.send({ msg: "ok", status: "Todo Updated" })


    } catch (error) {
        console.log(error)
        res.send({ msg: "error while updated" })
    }


})



todo.delete('/delete/:id', async (req, res) => {

    const id = req.params.id

    try {

        const isdelete = await TodoModel.findByIdAndDelete({ _id: id })

        if (isdelete === null) return res.send({ msg: "Id is Incorrect" })

        res.send({ msg: "ok", status: "Todo Deleted" })


    } catch (error) {
        console.log(error)
        res.send({ msg: "error while deleting" })
    }

})




module.exports = { todo }