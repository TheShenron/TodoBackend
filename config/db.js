const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connect = mongoose.connect(process.env.MONGODB_URL)

module.exports = { connect }