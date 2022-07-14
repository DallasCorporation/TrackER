const express = require('express')
const { testMail } = require('../controllers/mailerController')
const router = express.Router()

router.get('/mail/test', testMail)

module.exports = router