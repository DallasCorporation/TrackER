const asyncHandler = require('express-async-handler')
const Building = require('../models/buildingModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const registerBuilding = asyncHandler(async (req, res) => {
    const { name, contact, accNumber, address, type, agreeNumber, lat, long } = req.body

    if (!name || !contact || !address || !type || !agreeNumber || !lat || !long) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if building exists
    const buildingExists = await Building.findOne({ accNumber })

    if (buildingExists) {
        res.status(400)
        throw new Error('Building already exists')
    }


    // Create building
    const building = await Building.create({
        name,
        contact,
        accNumber,
        address,
        type,
        agreeNumber,
        lat,
        long,
    })

    if (building) {
        res.status(201).json({
            name: building.name,
            contact: building.contact,
            accNumber: building.accNumber,
            address: building.address,
            type: building.type,
            agreeNumber: building.agreeNumber,
            lat: building.lat,
            long: building.long,
        })
    } else {
        res.status(400)
        throw new Error('Invalid building data')
    }
})

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getBuildingsById = asyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    let myQuery = { accNumber: ObjectId(req.params.accNumber) };
    db_connect
        .collection("buildings")
        .findOne(myQuery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const displayBuildings = asyncHandler(async (req, res) => {

})

module.exports = {
    registerBuilding,
    getBuildingsById,
    displayBuildings,
}