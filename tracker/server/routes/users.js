const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/me', protect, getMe)
router.get('/user/:id', getUserById )
router.delete('/user/:id', deleteUserById )


module.exports = router