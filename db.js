const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Database Successfully Connected !!")
    } catch (err) {
        console.log("Error Connecting Database", err.message)
    }
}

module.exports = connectDB