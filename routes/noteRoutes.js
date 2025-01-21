const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes
} = require("../controllers/noteController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeNoteAccess = require("../middlewares/authorizeNoteAccess");
const checkRole = require("../middlewares/checkRole"); //Admin role....

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create a new note (Any authenticated user)
router.post("/", createNote);

// Get all notes belonging to the authenticated user
router.get("/", getNotes);

// Search notes by keyword (Only owner or shared users)
router.get("/search", authMiddleware, searchNotes);

// Get a specific note (Only owner or shared users)
router.get("/:id", authorizeNoteAccess, getNoteById);

// Update a note (Only owner or shared users)
router.put("/:id", authorizeNoteAccess, updateNote);

// Delete a note (Only owner & Admins)
router.delete("/:id", authorizeNoteAccess, deleteNote);

// Share a note with another user (Only owner)
router.post("/:id/share", authorizeNoteAccess, shareNote);

module.exports = router;
