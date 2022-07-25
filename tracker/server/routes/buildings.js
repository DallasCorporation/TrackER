const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
} = require('../controllers/buildingController')


router.post('/api/building/register', registerBuilding)
router.get('/api/building/:id', getBuildingsById)
router.delete('/api/building/:id', deleteBuildingById)


module.exports = router