const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
} = require('../controllers/buildingController')


router.post('/building/register', registerBuilding)
router.get('/building/:id', getBuildingsById)
router.delete('/building/:id', deleteBuildingById)


module.exports = router