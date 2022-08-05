const express = require('express')
const router = express.Router()
const {
    createPreference,
    updatePreference,
    getPreferenceById,
    getAvatarById
} = require('../controllers/userPreferenceController')

router.post('/api/preference/:id', createPreference)
router.put('/api/preference/:id', updatePreference)
router.get('/api/preference/:id', getPreferenceById)
router.get('/api/preference/avatar/:id', getAvatarById)

module.exports = router