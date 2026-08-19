import express from 'express'
import multer from 'multer'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfilePic,
} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

/**
 * @openapi
 * components:
 *   schemas:
 *     ProfilePic:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: https://res.cloudinary.com/demo/image/upload/v1612345678/sample.jpg
 *         public_id:
 *           type: string
 *           example: user_profiles/sample123
 *     UserRegisterInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password123!
 *         isAdmin:
 *           type: boolean
 *           default: false
 *           example: false
 *         userType:
 *           type: string
 *           enum: [member, staff]
 *           default: member
 *           example: member
 *     UserLoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password123!
 *     AuthResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d5ecb8b5c9c62b3c7c1a10
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         isAdmin:
 *           type: boolean
 *           example: false
 *         userType:
 *           type: string
 *           example: member
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     UserProfileResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d5ecb8b5c9c62b3c7c1a10
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         isAdmin:
 *           type: boolean
 *           example: false
 *         userType:
 *           type: string
 *           example: member
 *         profilePic:
 *           $ref: '#/components/schemas/ProfilePic'
 *     ProfilePicUploadResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Profile picture updated successfully
 *         profilePic:
 *           $ref: '#/components/schemas/ProfilePic'
 */

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: User already exists or Invalid user data
 *       500:
 *         description: Server error
 */
router.route('/register').post(registerUser)

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', authUser)

/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfileResponse'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.route('/profile').get(protect, getUserProfile)

/**
 * @openapi
 * /api/auth/profile/pic:
 *   put:
 *     summary: Upload or update user profile picture
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfilePicUploadResponse'
 *       400:
 *         description: Please upload an image file
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.route('/profile/pic').put(protect, upload.single('image'), updateUserProfilePic)

export default router