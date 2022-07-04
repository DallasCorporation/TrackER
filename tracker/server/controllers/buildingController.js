const asyncHandler = require('express-async-handler')
const Building = require('../models/buildingModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const registerBuilding = asyncHandler(async (req, res) => {
    const { name, contact, userId, address, type, lat, long } = req.body

    if (!name || !contact || !address || !type || !lat || !long) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if building exists
    const buildingExists = await Building.findOne({ address })

    if (buildingExists) {
        res.status(400)
        throw new Error('Building already exists')
    }


    // Create building
    const building = await Building.create({
        name,
        contact,
        userId,
        address,
        type,
        lat,
        long,
    })

    if (building) {
        res.status(201).json({
            _id: building.id,
            name: building.name,
            contact: building.contact,
            userId: building.userId,
            address: building.address,
            type: building.type,
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
    let myQuery = { userId: ObjectId(req.params.id) };
    db_connect
        .collection("buildings")
        .find(myQuery).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
})

const deleteBuildingById = asyncHandler(async (req, res) => {
    let myQuery = { _id: ObjectId(req.params.id) };
    const building = await Building.findById(myQuery)
    if (!building) {
        res.status(400)
        throw new Error('Goal not found')
    }
    // Check for user
    if (!building._id) {
        res.status(401)
        throw new Error('User not found')
    }
    await building.remove()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
}