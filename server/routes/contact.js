import express from 'express'
const router = express.Router()
import {
  createContact,
  getContacts,
  getContactById,
  deleteContact
} from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

/**
 * @openapi
 * components:
 *   schemas:
 *     ContactInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: Jane Doe
 *         email:
 *           type: string
 *           format: email
 *           example: jane@example.com
 *         message:
 *           type: string
 *           example: I have a question regarding billing.
 *         isAnonymous:
 *           type: boolean
 *           default: false
 *           example: false
 *     Contact:
 *       allOf:
 *         - $ref: '#/components/schemas/ContactInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 60d5ecb8b5c9c62b3c7c1a1b
 *             user:
 *               type: string
 *               example: 60d5ecb8b5c9c62b3c7c1a10
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: 2026-08-20T10:20:00.000Z
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: 2026-08-20T10:20:00.000Z
 */

/**
 * @openapi
 * /api/contact:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact message submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Missing required fields (email, name, message)
 *   get:
 *     summary: Get all contact submissions (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated contact submissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contact'
 *                 total:
 *                   type: integer
 *                   example: 45
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 20
 *                 startPage:
 *                   type: integer
 *                   example: 1
 *                 lastPage:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Not an admin
 */
router.route('/')
  .post(createContact)
  .get(protect, admin, getContacts)

/**
 * @openapi
 * /api/contact/{id}:
 *   get:
 *     summary: Get contact message by ID
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Contact ObjectId
 *     responses:
 *       200:
 *         description: Contact message details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Not authorized to view this message
 *       404:
 *         description: Contact message not found
 *   delete:
 *     summary: Delete contact message (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Contact ObjectId
 *     responses:
 *       200:
 *         description: Contact message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contact message removed
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Not an admin
 *       404:
 *         description: Contact message not found
 */
router.route('/:id')
  .get(protect, getContactById)
  .delete(protect, admin, deleteContact)

export default router