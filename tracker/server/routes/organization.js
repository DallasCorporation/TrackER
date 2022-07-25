const express = require('express')
const router = express.Router()
const { createOrganization, updateOrganization, getOrganizationById, deleteOrganization, getAll } = require('../controllers/organizationController')


router.get('/api/organization/all', getAll)
router.post('/api/organization', createOrganization)
router.get('/api/organization/:id', getOrganizationById)
router.put('/api/organization/:id', updateOrganization)
router.delete('/api/organization/:id', deleteOrganization)

module.exports = router