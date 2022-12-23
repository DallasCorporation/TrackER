const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    icon: {
        type: String,
    },
    userId: {
        type: ObjectId,
    },
    organization: {
        type: Array,
    },
    createdAt: {
        type: Date
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Organizations", organizationSchema);