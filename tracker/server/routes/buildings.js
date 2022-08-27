const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
    getBuilding,
    getBuildings,
    updateBuilding,
    getBuildingsByOrganizationId,
    updateBuildingResources
} = require('../controllers/buildingController')


router.post('/api/building/register', registerBuilding)
router.get('/api/building/:id', getBuildingsById)
router.get('/api/build/:id', getBuilding)
router.get('/api/builds', getBuildings)
router.delete('/api/building/:id', deleteBuildingById)
router.put('/api/building/:id', updateBuilding)
router.get('/api/building/organization/:id', getBuildingsByOrganizationId)
router.put('/api/building/resources/:id', updateBuildingResources)



module.exports = router