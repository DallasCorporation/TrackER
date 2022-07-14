
const asyncHandler = require('express-async-handler')
const Organization = require('../models/organizationModel')


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getOrganizationById = asyncHandler(async (req, res) => {
    const goal = await Organization.findOne({ userId: req.params.id })
    res.status(200).json({
        name: goal.name,
        icon: goal.icon,
        userId: goal.userId,
        customers: goal.customers,
        type: goal.type,
        _id: goal._id,
    })
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createOrganization = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const preference = await Organization.create({
        name: req.params.name,
        icon: "",
        userId: req.params.id,
        type: [],
        customers: []
    })

    res.status(200).json(preference)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateOrganization = asyncHandler(async (req, res) => {
    const preference = await Organization.find({ userId: req.params.id })
    if (!preference) {
        res.status(400)
        throw new Error('Organization not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }

    const update = await Organization.findByIdAndUpdate(preference[0]._id, req.body, {
        new: true,
    })

    res.status(200).json(update)
})



module.exports = {
    getOrganizationById,
    createOrganization,
    updateOrganization,
}
