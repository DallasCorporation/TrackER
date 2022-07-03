const express = require('express')
const router = express.Router()
const {
    createPreference,
    updatePreference,
    getPreferenceById
} = require('../controllers/userPreferenceController')

router.post('/preference/:id', createPreference)
router.put('/preference/:id', updatePreference)
router.get('/preference/:id', getPreferenceById)

module.exports = router