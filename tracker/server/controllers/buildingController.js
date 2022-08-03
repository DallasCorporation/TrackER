const asyncHandler = require('express-async-handler')
const Building = require('../models/buildingModel')
const Organization = require('../models/organizationModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const registerBuilding = asyncHandler(async (req, res) => {
    const { name, contact, userId, address, type, organizationId, sqft, lat, long } = req.body

    if (!name || !contact || !address || !type || !lat || !long || !organizationId || !sqft) {
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
        organizationId,
        sqft,
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
            organizationId: building.organizationId,
            sqft: building.sqft,
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

const updateBuilding = asyncHandler(async (req, res) => {
    const building = await Building.findById(req.params.id)

    if (!building) {
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (building._id.toString() !== req.params.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updateBuilding)
})

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

const getBuilding = asyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("buildings")
        .find(myQuery).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
})

const getBuildings = asyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect
        .collection("buildings")
        .find({}).toArray(function (err, result) {
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
    // const organization = await Organization.findById(building.organizationId)
    // let tmp = organization
    // let customersCopy = organization.customers
    // customersCopy.pop(building.userId)
    // tmp.customers = customersCopy
    // const updateOrganization = await Organization.findByIdAndUpdate(building.organizationId, tmp, {
    //     new: true,
    // })

    await building.remove()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
    getBuilding,
    getBuildings,
    updateBuilding
}