const express = require('express')
const router = express.Router()
const {
    create, deleteRenewable, getAll, getRenewableById, updateRenewable, getRenewableByOrganizationId, getRenewableByBuildingId, updateRenewableBuildingsById
} = require('../controllers/renewableController')


router.put('/api/renewable/:id', updateRenewable)
router.get('/api/renewable/:id', getRenewableById)
router.get('/api/renewable/organization/:id', getRenewableByOrganizationId)
router.get('/api/all/renewable', getAll)
router.get('/api/renewable/building/:id', getRenewableByBuildingId)
router.put('/api/renewable/buildings/:id', updateRenewableBuildingsById)
router.post('/api/renewable', create)
router.delete('/api/renewable/:id', deleteRenewable)


module.exports = router