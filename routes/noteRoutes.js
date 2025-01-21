const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
} = require("../controllers/noteController");

const authMiddleware = require("../middlewares/authMiddleware");
const authorizeNoteAccess = require("../middlewares/authorizeNoteAccess");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Notes CRUD operations
router.post("/", createNote); // Create a note (Authenticated user)
router.get("/", getNotes); // Retrieve all user notes
router.get("/search", searchNotes); // Search notes by keyword
router.get("/:id", authorizeNoteAccess, getNoteById); // Get note by ID
router.put("/:id", authorizeNoteAccess, updateNote); // Update note
router.delete("/:id", authorizeNoteAccess, deleteNote); // Delete note

// Sharing functionality
router.post("/:id/share", authorizeNoteAccess, shareNote);

module.exports = router;
