const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
    getBuilding,
    getBuildings,
    updateBuilding
} = require('../controllers/buildingController')


router.post('/api/building/register', registerBuilding)
router.get('/api/building/:id', getBuildingsById)
router.get('/api/build/:id', getBuilding)
router.get('/api/builds', getBuildings)
router.delete('/api/building/:id', deleteBuildingById)
router.post('/api/building/update', updateBuilding)


module.exports = router