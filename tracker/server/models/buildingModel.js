const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose")

const buildingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add the building name'],
        minlength: 3,
        maxlength: 30,
    },
    contact: {
        type: String,
        required: [true, 'Please add a contact name'],
        minlength: 6,
        maxlength: 30,
    },
    accNumber: {
        type: String,
        required: [true, 'Please add a ???'],
        maxlength: 255,
        minlength: 6
    },
    address: {
        type: String,
        required: [true, 'Please add the address'],
        maxlength: 1024,
        minlength: 8
    },
    type: {
        type: String,
        required: [true, 'Please add the typo of the building'],
        maxlength: 1024,
        minlength: 8
    },
    agreeNumber: {
        type: String,
        required: [true, 'Please add a ???'],
        maxlength: 1024,
        minlength: 8
    },
    lat: {
        type: Decimal128,
        required: [true, 'Please add the LAT of the building'],
        maxlength: 1024,
        minlength: 2
    },
    long: {
        type: Decimal128,
        required: [true, 'Please add the LONG of the building'],
        maxlength: 1024,
        minlength: 2
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Building", buildingSchema);