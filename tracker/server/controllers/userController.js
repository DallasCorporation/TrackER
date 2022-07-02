const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body

  if (!name || !surname || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hashedPassword,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hashedPassword,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
// Getting user By ID
const getUserById = asyncHandler(async (req, res) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("users")
    .findOne(myQuery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})

// @desc    Update user by Id
// @route   PUT /api/user/:id
// @access  Private
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (user._id.toString() !== req.params.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedUser)
})

// @desc    Update user by Id
// @route   PUT /api/user/password/:id
// @access  Private
const updateUserPasswordById = asyncHandler(async (req, res) => {
  const { password } = req.body
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (user._id.toString() !== req.params.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const updatedUserPassword = await User.findByIdAndUpdate(
    req.params.id,
    { password: hashedPassword, }, {
    new: true,
  })
  res.status(200).json(updatedUserPassword)
})

// @desc    Delete User
// @route   DELETE /api/user/:id
// @access  Private
const deleteUserById = asyncHandler(async (req, res) => {
  let myQuery = { _id: ObjectId(req.params.id) };
  const user = await User.findById(myQuery)
  if (!user) {
    res.status(400)
    throw new Error('Goal not found')
  }
  // Check for user
  if (!user._id) {
    res.status(401)
    throw new Error('User not found')
  }
  await user.remove()
  res.status(200).json({ id: req.params.id })
})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserPasswordById
}