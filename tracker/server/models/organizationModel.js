const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        minlength: 3,
        maxlength: 30,
    },
    description: {
        type: String,
    },
    userId: {
        type: ObjectId,
    },
    type: {
        type: Array
    },
    icon: {
        data: Buffer,
        contentType: String
    },
    customers: {
        type: Array
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Organization", organizationSchema);