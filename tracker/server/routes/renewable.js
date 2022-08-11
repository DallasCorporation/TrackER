const express = require('express')
const router = express.Router()
const {
    create, deleteRenewable, getAll, getRenewableById, updateRenewable,getRenewableByOrganizationId
} = require('../controllers/renewableController')


router.put('/api/renewable/:id', updateRenewable)
router.get('/api/renewable/:id', getRenewableById)
router.get('/api/renewable/organization/:id', getRenewableByOrganizationId)
router.get('/api/renewable/all', getAll)
router.post('/api/renewable', create)
router.delete('/api/renewable/:id', deleteRenewable)

module.exports = router