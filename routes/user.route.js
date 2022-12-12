const { Router } = require('express')
const user = Router()

//Todo Model
const { UserModel } = require('../models/user.model')


//middleware
const { hashing , dehashing } = require('../middleware/hashing')
const { genToken  } = require('../middleware/genToken')


//Routes...


user.get('/' , (req,res)=>{
    res.send('user')
})



//user signup
user.post('/signup' , async (req,res)=>{

    const userData = req.body

    try {
        
        //checking email is already present or not
        const isPresent = await UserModel.findOne({email:userData.email})

        if(isPresent !== null) return res.send({msg:"Email is already present"})

        //Incrept password
        const hash = hashing(userData.password)

        //changing the passowrd
        userData.password = hash

        //storing in DB
        const store = new UserModel(userData)
        const done =  await store.save()

        //Generating token
        const token = genToken({id:done.id})

        //sending to user
        res.send({msg:"ok" , token})


    } catch (error) {
        console.log(error)
        res.send({msg:"error in signup"})
    }

})



user.post('/login' , async (req,res)=>{

    const loginData = req.body

    try {

        //checking email present present in Db or not
        const isPresent = await UserModel.findOne({email:loginData.email})

        if(isPresent === null) return res.send({msg:"Email not present"})

        //dehashing password
        const pass = dehashing(loginData.password ,isPresent.password)
        console.log(pass)

        if(pass === false) return res.send({msg: "password is Increact!"})
       //and if true

       //creating token
       const token = genToken({id:isPresent.id})

       //sending resp
       res.send({msg:"ok" , token})

        
    } catch (error) {
        console.log(error)
        res.send({msg:"error in login"})
    }
})



module.exports = { user }