const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    displayBuildings,
} = require('../controllers/buildingController')


router.post('/building/register', registerBuilding)
router.get('/building/get', getBuildingsById)


module.exports = router