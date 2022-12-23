
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose")

const temperatureSchema = new mongoose.Schema({
    currentTemperature: { type: Number },
    currentHumidity: { type: Number },
    history: { type: Array },
    buildingId: { type: ObjectId },
})

module.exports = mongoose.model("Temperature", temperatureSchema);