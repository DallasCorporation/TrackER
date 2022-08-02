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
       type:String
    },
    customers: {
        type: Array
    },
    details: {
        type: Object
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Organization", organizationSchema);