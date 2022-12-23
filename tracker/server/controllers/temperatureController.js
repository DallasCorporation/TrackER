const asyncHandler = require('express-async-handler');
const temperatureModel = require('../models/temperatureModel');
const { ObjectId } = require('mongodb');

const addTemperatureData = asyncHandler(async (req, res) => {
    const exist = await temperatureModel.find({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })
    if (exist) {
        let date = new Date().toLocaleString('it-IT')
        temperatureModel.findOneAndUpdate(
            { "buildingId": ObjectId("62ed1f97d158cb42b69e5356") },
            {
                currentHumidity: req.body.humidity,
                currentTemperature: req.body.temperature,
                "$push": {
                    "history": {
                        humidity: req.body.humidity,
                        temperature: req.body.temperature,
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
                    throw new Error('Invalid temperature data')
                }
            })
    }
    else {
        const temperature = await temperatureModel.create({
            history: [],
            currentHumidity: 0,
            currentTemperature: 0,
            buildingId: ObjectId("62ed1f97d158cb42b69e5356")
        })
        if (temperature) {
            res.status(201).json({
                temperature
            })
        } else {
            res.status(400)
            throw new Error('Invalid data')
        }
    }
})

const getTemperatureData = asyncHandler(async (req, res) => {
    const goal = await temperatureModel.findOne({ buildingId: ObjectId("62ed1f97d158cb42b69e5356") })
    if (goal)
        res.status(200).json(goal)
    else {
        res.status(400)
        throw new Error('renewable not found')
    }
})

module.exports = {
    addTemperatureData,
    getTemperatureData
}
