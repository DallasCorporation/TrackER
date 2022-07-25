const express = require('express')
const router = express.Router()
const {
    createActivity,
    getActivityById,
} = require('../controllers/activityController')


router.post('/api/activity', createActivity)
router.get('/api/activity/:id', getActivityById)


module.exports = router