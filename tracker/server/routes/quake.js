const express = require('express')
const router = express.Router()
const { addQuakeData, getQuakeData } = require('../controllers/quakeController')

router.post('/api/quake/62ed1f97d158cb42b69e5356', addQuakeData)
router.get('/api/quake/62ed1f97d158cb42b69e5356', getQuakeData)

module.exports = router