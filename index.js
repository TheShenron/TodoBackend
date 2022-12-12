const express = require('express')
const app = express()

//DotEnv
require('dotenv').config()

//PORT
const PORT = process.env.PORT || 8080

//MONGODB_URL
const { connect } = require('./config/db')


//Rate limiter
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)



//middleware
app.use(express.json())



//Imported Routes
const { todo } = require('./routes/todo.route')
const { user } = require("./routes/user.route")



//Routes...

app.use('/user' , user)

app.use('/todo' , todo)


app.get("/" , (req,res)=>{
    res.send("Welcome to todo API")
})


app.listen(PORT ,async ()=>{
    
    console.log("App is Running At " + PORT)
    await connect
    console.log("Connected to DB")

})