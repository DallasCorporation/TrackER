const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const userPreferenceSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
    },
    activityLog: {
        type: Boolean
    },
    notification: {
        type: Boolean
    },
    news: {
        type: Boolean
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model("UserPreference", userPreferenceSchema);