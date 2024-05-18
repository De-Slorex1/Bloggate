const mongoose = require('mongoose')

const connectDb = async () => {
    const res = mongoose.connect(process.env.MONGO_DB_URL)
    console.log("connected to database succesfully")
}

module.exports = {connectDb}