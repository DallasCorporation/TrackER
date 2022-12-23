
const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')
const Organization = require('../models/organizationModel')

const getOrganization = asyncHandler(async (req, res) => {
    const goal = await Organization.findOne({ _id: ObjectId("62ebb9ef62137fef13963caf") })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('organization not found')
    }
})

module.exports = {
    getOrganization,
}
