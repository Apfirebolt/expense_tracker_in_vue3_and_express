import asyncHandler from "express-async-handler";
import Contact from "../models/contact.js";

// @desc    Create a new contact submission
// @route   POST /api/contact
// @access  Public (Optional Auth for logged-in user)
const createContact = asyncHandler(async (req, res) => {
  const { email, name, message, isAnonymous } = req.body;

  if (!email || !name || !message) {
    res.status(400);
    throw new Error("Please provide email, name, and message");
  }

  const contactData = {
    email,
    name,
    message,
    isAnonymous: Boolean(isAnonymous),
    user: req.user ? req.user._id : undefined,
  };

  const contact = await Contact.create(contactData);

  res.status(201).json({
    success: true,
    data: contact,
  });
});

// @desc    Get paginated contact submissions
// @route   GET /api/contact
// @access  Private - Admin only
const getContacts = asyncHandler(async (req, res) => {
  const itemsPerPage = Number(req.query.limit) || 20;
  const startPage = Number(req.query.page) || 1;

  const count = await Contact.countDocuments();
  const contacts = await Contact.find({})
    .populate("user", "firstName lastName email")
    .sort({ createdAt: -1 })
    .skip(itemsPerPage * (startPage - 1))
    .limit(itemsPerPage);

  res.status(200).json({
    success: true,
    data: contacts,
    total: count,
    itemsPerPage,
    startPage,
    lastPage: Math.ceil(count / itemsPerPage),
  });
});

// @desc    Get single contact submission by ID
// @route   GET /api/contact/:id
// @access  Private - Admin or Submitter
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id).populate(
    "user",
    "firstName lastName email"
  );

  if (!contact) {
    res.status(404);
    throw new Error("Contact message not found");
  }

  // Allow access if admin or if registered user created it
  const isOwner = contact.user && req.user && contact.user._id.equals(req.user._id);
  const isAdmin = req.user && req.user.isAdmin;

  if (!isAdmin && !isOwner) {
    res.status(403);
    throw new Error("Not authorized to view this contact message");
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private - Admin only
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact message not found");
  }

  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Contact message removed",
  });
});

export {
  createContact,
  getContacts,
  getContactById,
  deleteContact,
};