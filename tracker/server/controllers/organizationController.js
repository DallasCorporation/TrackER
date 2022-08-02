
const asyncHandler = require('express-async-handler')
const Organization = require('../models/organizationModel')


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getOrganizationById = asyncHandler(async (req, res) => {
    const goal = await Organization.findOne({ userId: req.params.id })
    if (goal)
        res.status(200).json({
            name: goal.name,
            icon: goal.icon,
            userId: goal.userId,
            customers: goal.customers,
            type: goal.type,
            _id: goal._id,
            details: goal.details,
            description: goal.description,
            createdAt: goal.createAt
        })
    else {
        res.status(400)
        throw new Error('organization not found')
    }
})


const getAll = asyncHandler(async (req, res) => {
    const goal = await Organization.find({})
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('Organizations not found')
    }
})


// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createOrganization = asyncHandler(async (req, res) => {
    if (!req.body.userId) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const preference = await Organization.create({
        name: req.body.name,
        icon: {},
        userId: req.body.userId,
        type: [],
        customers: [],
        description: "",
        details: {}
    })

    res.status(200).json(preference)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateOrganization = asyncHandler(async (req, res) => {
    const organization = await Organization.findById(req.params.id)
    if (!organization) {
        res.status(400)
        throw new Error('Organization not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }

    const update = await Organization.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(update)
})

const deleteOrganization = asyncHandler(async (req, res) => {
    const preference = await Organization.find({ _id: req.params.id })
    if (!preference) {
        res.status(400)
        throw new Error('Organization not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }

    const update = await Organization.findByIdAndDelete(preference)
    res.status(200).json(update)
})

module.exports = {
    getOrganizationById,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getAll
}
