const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minlength: 3,
        maxlength: 30,
    },
    surname: {
        type: String,
        required: [true, 'Please add a surname'],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        maxlength: 255,
        minlength: 6
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        maxlength: 1024,
        minlength: 8
    },
    type: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);