const express = require('express')
const router = express.Router()
const {
    addData, getBills
} = require('../controllers/billsController')


router.post('/api/bills/:id', addData)
router.get('/api/bills', getBills)
module.exports = router