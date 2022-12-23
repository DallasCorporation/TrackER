const express = require('express')
const router = express.Router()
const { addTemperatureData, getTemperatureData } = require('../controllers/temperatureController')

router.put('/api/temperature', addTemperatureData)
router.get('/api/temperature', getTemperatureData)

module.exports = router