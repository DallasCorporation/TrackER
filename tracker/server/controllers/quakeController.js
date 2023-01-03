const asyncHandler = require('express-async-handler');
const quakeModel = require('../models/quakeModel');
const { ObjectId } = require('mongodb');

const addQuakeData = asyncHandler(async (req, res) => {
    const exist = await quakeModel.find({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })
    if (exist) {
        let date = new Date().toLocaleString('it-IT')
        quakeModel.findOneAndUpdate(
            { "buildingId": ObjectId("62ed1f97d158cb42b69e5356") },
            {
                "$push": {
                    "intensity": {
                        value: Number(req.body.intensity),
                        date
                    }
                }
            },
            { new: true }).then(result => {
                if (result) {
                    res.status(201).json({
                        result
                    })
                } else {
                    res.status(400)
                    throw new Error('Invalid quake data')
                }
            })
    }
    else {
        const quake = await quakeModel.create({
            intensity: {},
            buildingId: req.params.id
        })
        if (quake) {
            res.status(201).json({
                quake
            })
        } else {
            res.status(400)
            throw new Error('Invalid data')
        }
    }
})

const getQuakeData = asyncHandler(async (req, res) => {
    const goal = await quakeModel.findOne({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('quake not found')
    }
})

module.exports = {
    addQuakeData,
    getQuakeData
}
