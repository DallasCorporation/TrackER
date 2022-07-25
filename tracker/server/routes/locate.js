const express = require('express')
const router = express.Router()
const { locateCoords } = require('../controllers/locateController');


router.get('/api/:name', locateCoords)

module.exports = router