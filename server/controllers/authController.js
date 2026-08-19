import asyncHandler from 'express-async-handler'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from '../utils/generateToken.js'
import User from '../models/user.js'

// Helper: Stream buffer directly to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'user_profiles' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    uploadStream.end(buffer)
  })
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, isAdmin, userType } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    userType,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      userType: user.userType,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      userType: user.userType,
      profilePic: user.profilePic,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile picture
// @route   PUT /api/auth/profile/pic
// @access  Private
const updateUserProfilePic = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400)
    throw new Error('Please upload an image file')
  }

  const user = await User.findById(req.user._id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // Delete previous Cloudinary image if it exists
  if (user.profilePic?.public_id) {
    await cloudinary.uploader.destroy(user.profilePic.public_id)
  }

  const result = await uploadToCloudinary(req.file.buffer)

  user.profilePic = {
    url: result.secure_url,
    public_id: result.public_id,
  }

  const updatedUser = await user.save()

  res.status(200).json({
    message: 'Profile picture updated successfully',
    profilePic: updatedUser.profilePic,
  })
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfilePic,
}