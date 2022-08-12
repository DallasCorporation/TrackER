
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')
const Renewable = require('../models/renewableModel')

const getRenewableById = asyncHandler(async (req, res) => {
    const goal = await Renewable.findOne({ _id: ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('renewable not found')
    }
})

const getRenewableByOrganizationId = asyncHandler(async (req, res) => {
    const goal = await Renewable.find({ organizationId: ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400).json({})
        throw new Error('Renewable not found')
    }
})


const getAll = asyncHandler(async (req, res) => {
    const goal = await Renewable.find()
    if (goal) res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('Renewable not found')
    }
})


const create = asyncHandler(async (req, res) => {
    if (!req.body.organizationId) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const renewable = await Renewable.create({
        name: req.body.name,
        organizationId: req.body.organizationId,
        buildings: req.body.buildings,
        earning: req.body.earning,
        organization: req.body.organization,
        price: req.body.price,
        type: req.body.type,
        resourcesType: req.body.resourcesType,
    })
    res.status(200).json(renewable)
})

const updateRenewable = asyncHandler(async (req, res) => {
    const renewable = await Renewable.findById(req.params.id)
    if (!renewable) {
        res.status(400)
        throw new Error('Renewable not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }
    const update = await Renewable.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(update)
})

const deleteRenewable = asyncHandler(async (req, res) => {
    const renewable = await Renewable.findById({ _id: ObjectId(req.params.id) })
    if (!renewable) {
        res.status(400)
        throw new Error('Renewable not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }
    const update = await Renewable.findByIdAndDelete(renewable)
    res.status(200).json(update)
})

module.exports = {
    updateRenewable,
    deleteRenewable,
    getAll,
    getRenewableById,
    create,
    getRenewableByOrganizationId
}
