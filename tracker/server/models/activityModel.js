const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
    },
    country_code: {
        type: String,
    },
    country_name: {
        type: String,
    },
    city: {
        type: String,
    },
    IPv4: {
        type: String,
    },
    state: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Activities", activitySchema);