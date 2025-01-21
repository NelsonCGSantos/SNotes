const { Note, SharedNote } = require("../models");

const authorizeNoteAccess = async (req, res, next) => {
  try {
    const { id: noteId } = req.params; // Extract note ID from request parameters
    if (!noteId) {
      return res.status(400).json({ message: "Missing note ID in request." });
    }

    // Retrieve the note from the database
    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const isOwner = note.userId === req.user.id;
    const isShared = await SharedNote.findOne({
      where: { noteId: note.id, sharedWithUserId: req.user.id },
    });

    // Grant access if the user owns the note or has shared access (if an admin)
    if (isOwner || (isShared && req.user.role === "admin")) {
      return next();
    }

    return res.status(403).json({ message: "Unauthorized access" });
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorizeNoteAccess;
