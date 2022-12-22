const asyncHandler = require('express-async-handler');
const quakeModel = require('../models/quakeModel');

const addQuakeData = asyncHandler(async (req, res) => {
    const exist = await quakeModel.findOne({ buildingId: req.params.id })
    if (exist) {
        let quake =
            quakeModel.updateOne(
                { "buildingId": req.params.id },
                {
                    "$push": {
                        "intensity": {
                            value: req.body.intensity,
                            date: Date.now
                        }
                    }
                },
                function (err, count) { console.log(err) }).then(res => console.log(res))
        if (quake) {
            res.status(201).json({
                quake
            })
        }
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
    const goal = await quakeModel.findOne({ _id: ObjectId(req.params.id) })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('renewable not found')
    }
})

module.exports = {
    addQuakeData,
    getQuakeData
}
