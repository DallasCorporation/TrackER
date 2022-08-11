const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const renewableSchema = new mongoose.Schema({
    organizationId: {
        type: ObjectId,
    },
    buildings: {
        type: Array
    },
    price: {
        type: Number,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    resourcesType: {
        type: String,
    },
    earning: {
        type: Number,
    },
    organization: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Renewable", renewableSchema);