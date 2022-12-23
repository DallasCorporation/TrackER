const express = require('express')
const router = express.Router()
const {
    addData, getBills, getBillsAggregatedFiltered, getBillsByOrganizationId, getBuildingBills,
    getBillsRenewableOnly
} = require('../controllers/billsController')


router.put('/api/bills/:id', addData)
router.get('/api/bills', getBills)
router.get('/api/bills/buildings/:id', getBuildingBills)
router.get('/api/bills/:id', getBillsAggregatedFiltered)
router.get('/api/bills/renewable/:id', getBillsRenewableOnly)
router.get('/api/bills/organization/:id', getBillsByOrganizationId)

module.exports = router