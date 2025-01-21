const { Note, SharedNote } = require("../models");

const authorizeNoteAccess = async (req, res, next) => {
  try {
    console.log("🔍 Request Params:", req.params); // Log the request parameters

    const noteId = req.params.id; // Extract the note ID from route params
    if (!noteId) {
      return res.status(400).json({ message: "Missing note ID in request." });
    }

    const note = await Note.findByPk(noteId);
    console.log("✅ Found Note:", note); // Log the note result

    if (!note) {
      console.log("❌ Note not found!");
      return res.status(404).json({ message: "Note not found" });
    }

    const isOwner = note.userId === req.user.id;
    const isShared = await SharedNote.findOne({
      where: { noteId: note.id, sharedWithUserId: req.user.id },
    });
    console.log("🔍 Shared Access Check:", isShared);

    console.log("🔍 Owner:", isOwner, "| Shared:", Boolean(isShared)); // Log ownership and sharing status

    if (isOwner || isShared) {
      return next();
    } else {
      console.log("❌ Unauthorized access!");
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error("❌ Authorization Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorizeNoteAccess;
