const express = require('express')
const router = express.Router()
const { createOrganization, updateOrganization, getOrganizationById,getOrganizationByUserId, deleteOrganization, getAll, updateOrganizationResources } = require('../controllers/organizationController')


router.get('/api/organization/all', getAll)
router.post('/api/organization', createOrganization)
router.get('/api/organization/user/:id', getOrganizationByUserId)
router.get('/api/organization/:id', getOrganizationById)
router.put('/api/organization/:id', updateOrganization)
router.put('/api/organization/resources/:id', updateOrganizationResources)
router.delete('/api/organization/:id', deleteOrganization)

module.exports = router