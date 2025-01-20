const Note = require("../models/note");
const SharedNote = require("../models/sharednote");

const authorizeNoteAccess = async (req, res, next) => {
  try {
    const note = await Note.findByPk(req.params.noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const isOwner = note.ownerId === req.user.id;

    const isShared = await SharedNote.findOne({
      where: { noteId: note.id, sharedWithUserId: req.user.id },
    });

    if (isOwner || isShared) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorizeNoteAccess;
