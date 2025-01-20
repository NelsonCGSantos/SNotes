const { Note, SharedNote } = require("../models");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = await Note.create({ title, content, userId: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getNotes = async (req, res) => {
  const notes = await Note.findAll({ where: { userId: req.user.id } });
  res.json(notes);
};

exports.getNoteById = async (req, res) => {
  const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
};

exports.updateNote = async (req, res) => {
  await Note.update(req.body, { where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: "Note updated" });
};

exports.deleteNote = async (req, res) => {
  await Note.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: "Note deleted" });
};

exports.shareNote = async (req, res) => {
  await SharedNote.create({ noteId: req.params.id, sharedWithUserId: req.body.userId });
  res.json({ message: "Note shared" });
};
