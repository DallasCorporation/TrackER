const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const billsSchema = new mongoose.Schema({
    buildingId: {
        type: ObjectId,
    },
    bills: {
        type: Array,
    },
})

module.exports = mongoose.model("Bills", billsSchema);