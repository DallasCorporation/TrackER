const express = require('express')
const router = express.Router()
const {
    addData
} = require('../controllers/billsController')


router.post('/api/bills/:id', addData)

module.exports = router