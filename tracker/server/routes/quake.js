const express = require('express')
const router = express.Router()
const { addQuakeData, getQuakeData } = require('../controllers/quakeController')

router.put('/api/quake', addQuakeData)
router.get('/api/quake', getQuakeData)

module.exports = router