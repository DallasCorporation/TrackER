const express = require('express')
const router = express.Router()
const {
    addData, getBills, getBillsAggregatedFiltered, getBillsByOrganizationId
} = require('../controllers/billsController')


router.post('/api/bills/:id', addData)
router.get('/api/bills', getBills)
router.get('/api/bills/:id', getBillsAggregatedFiltered)
router.get('/api/bills/organization/:id', getBillsByOrganizationId)
module.exports = router