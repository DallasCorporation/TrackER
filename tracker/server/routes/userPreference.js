const express = require('express')
const router = express.Router()
const {
    createPreference,
    updatePreference,
    getPreferenceById
} = require('../controllers/userPreferenceController')

router.post('/api/preference/:id', createPreference)
router.put('/api/preference/:id', updatePreference)
router.get('/api/preference/:id', getPreferenceById)

module.exports = router