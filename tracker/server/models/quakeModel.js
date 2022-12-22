
const { ObjectId } = require("mongodb");

const mongoose = require("mongoose")

const renewableSchema = new mongoose.Schema({
    intensity: { type: Object },
    date: { type: Date },
    buildingId: { type: ObjectId }

})

module.exports = mongoose.model("Quake", renewableSchema);