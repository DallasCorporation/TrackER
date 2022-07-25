const express = require('express')
const router = express.Router()
const {
    registerBuilding,
    getBuildingsById,
    deleteBuildingById,
    getBuilding
} = require('../controllers/buildingController')


router.post('/api/building/register', registerBuilding)
router.get('/api/building/:id', getBuildingsById)
router.get('/api/build/:id', getBuilding)
router.delete('/api/building/:id', deleteBuildingById)


module.exports = router