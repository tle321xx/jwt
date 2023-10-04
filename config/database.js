const mongoose = require('mongoose')

// 1
exports.connect = () => {
    // connect to DB
    mongoose.connect('mongodb+srv://tvachirawit28:sdl5IoU9BXyb5qn5@cluster0.dzdbbxn.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(() => {
        console.log("Successfully connected")
    })
    .catch((err) => {
        console.log("Error Connecting")
        console.log(err)
        process.exit(1);
    })
}