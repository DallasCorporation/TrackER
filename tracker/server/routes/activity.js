const express = require('express')
const router = express.Router()
const {
    createActivity,
    getActivityById,
} = require('../controllers/activityController')


router.post('/activity', createActivity)
router.get('/activity/:id', getActivityById)


module.exports = router