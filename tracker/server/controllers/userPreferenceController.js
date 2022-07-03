const axios = require('axios')
const asyncHandler = require('express-async-handler')
const Preference = require('../models/userPreferenceModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getPreferenceById = asyncHandler(async (req, res) => {
    const goal = await Preference.findOne({ userId: req.params.id })
    res.status(200).json({
        activityLog: goal.activityLog,
        avatar: goal.avatar,
        _id: goal._id,
        notification: goal.notification
    })
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createPreference = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const preference = await Preference.create({
        activityLog: true,
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        userId: req.params.id,
        notification: true
    })

    res.status(200).json(preference)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updatePreference = asyncHandler(async (req, res) => {
    console.log(req.params)
    const preference = await Preference.find({ userId: req.params.id })
    console.log(preference[0]._id)
    if (!preference) {
        res.status(400)
        throw new Error('Preference not found')
    }
    if (!req.params.id) {
        res.status(401)
        throw new Error('User not found')
    }

    const update = await Preference.findByIdAndUpdate(preference[0]._id, req.body, {
        new: true,
    })

    res.status(200).json(update)
})



module.exports = {
    getPreferenceById,
    createPreference,
    updatePreference,
}
