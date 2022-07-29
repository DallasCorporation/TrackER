const express = require('express')
const router = express.Router()
const {
    addData, getBills, getBillsAggregatedFiltered
} = require('../controllers/billsController')


router.post('/api/bills/:id', addData)
router.get('/api/bills', getBills)
router.get('/api/bills/:id', getBillsAggregatedFiltered)
module.exports = router