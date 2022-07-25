const axios = require('axios')
const asyncHandler = require('express-async-handler')
const Activity = require('../models/activityModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

const createActivity = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const data = await axios.get('https://geolocation-db.com/json/').then((data) => data.data)
    if (!userId) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const activityExists = await Activity.findOne({ IPv4: data.IPv4 })
    if (activityExists) {
        const updatedUser = await Activity.findOneAndUpdate(
            { userId: activityExists.userId },
            { ...data, date: Date.now() }, {
            new: true,
        })
        if (updatedUser)
            res.status(200).json({ ...data, date: Date.now() })
    }
    else {
        const activity = await Activity.create({
            ...data,
            userId,
        })
        if (activity) {
            res.status(201).json({ ...data })
        } else {
            res.status(400)
            throw new Error('Invalid data')
        }
    }

})

// @desc    Get goals
// @route   GET /activity/:id
// @access  Private
const getActivityById = asyncHandler(async (req, res) => {
    let db_connect = dbo.getDb();
    let myQuery = { userId: ObjectId(req.params.id) };
    db_connect
        .collection("activities")
        .find(myQuery).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
})

module.exports = {
    createActivity,
    getActivityById,
}
