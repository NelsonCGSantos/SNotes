const { Note, SharedNote } = require("../models"); // ✅ Import models correctly

const authorizeNoteAccess = async (req, res, next) => {
  try {
    console.log("🔍 Checking note with ID:", req.params.noteId);

    const note = await Note.findByPk(req.params.noteId);

    if (!note) {
      console.log("❌ Note not found!");
      return res.status(404).json({ message: "Note not found" });
    }

    console.log("✅ Note found:", note);

    const isOwner = note.ownerId === req.user.id;

    const isShared = await SharedNote.findOne({
      where: { noteId: note.id, sharedWithUserId: req.user.id },
    });

    console.log("🔍 Owner:", isOwner, "| Shared:", Boolean(isShared));

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
