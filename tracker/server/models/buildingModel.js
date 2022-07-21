const { Decimal128, ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the building name'],
    },
    contact: {
        type: String,
        required: [true, 'Please add a contact name'],
    },
    userId: {
        type: ObjectId,
    },
    organizationId: {
        type: ObjectId,
    },
    address: {
        type: String,
        required: [true, 'Please add the address'],
    },
    type: {
        type: String,
        required: [true, 'Please add the typo of the building'],
    },
    sqft: {
        type: Number,
    },
    lat: {
        type: String,
        required: [true, 'Please add the LAT of the building'],
    },
    long: {
        type: String,
        required: [true, 'Please add the LONG of the building'],
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Building", buildingSchema);