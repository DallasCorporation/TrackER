const express = require('express')
const router = express.Router()
const { createOrganization, updateOrganization, getOrganizationById, deleteOrganization } = require('../controllers/organizationController')


router.post('/organization', createOrganization)
router.get('/organization/:id', getOrganizationById)
router.put('/organization/:id', updateOrganization)
router.delete('/organization/:id', deleteOrganization)

module.exports = router