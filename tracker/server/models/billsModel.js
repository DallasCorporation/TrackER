const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const billsSchema = new mongoose.Schema({
    buildingId: {
        type: ObjectId,
    },
    electric: {
        type: Number,
    },
    gas: {
        type: Number,
    },
    water: {
        type: Number,
    },
    resources: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bills", billsSchema);