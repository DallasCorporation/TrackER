const express = require('express')
const router = express.Router()
const {  getOrganization } = require('../controllers/organizationController')

router.get('/api/organization', getOrganization)

module.exports = router