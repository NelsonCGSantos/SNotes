const { Op } = require("sequelize");
const { Note, SharedNote } = require("../models");

exports.createNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = await Note.create({ title, content, userId: req.user.id });
    res.status(201).json(note);
  } catch (error) {
    console.error("❌ Create Note Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    console.log("🔹 Fetching notes for user:", req.user.id);

    // Find notes created by the user
    const userNotes = await Note.findAll({ where: { userId: req.user.id } });

    // Find notes shared with the user
    const sharedNotes = await SharedNote.findAll({
      where: { sharedWithUserId: req.user.id },
      include: [{ model: Note, as: "sharedNote" }],
    });

    // Extract shared notes from the response
    const sharedNotesList = sharedNotes.map((s) => s.sharedNote);

    // Combine both lists
    const allNotes = [...userNotes, ...sharedNotesList];

    res.json(allNotes.length ? allNotes : []); // Ensure empty array if no notes found
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("❌ Error fetching note by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ error: "Provide at least one field to update." });
    }

    const updated = await Note.update(req.body, { where: { id: req.params.id, userId: req.user.id } });

    if (!updated[0]) {
      return res.status(404).json({ error: "Note not found or no changes made" });
    }

    res.json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("❌ Error updating note:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const deleted = await Note.destroy({ where: { id: req.params.id, userId: req.user.id } });

    if (!deleted) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.shareNote = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Shared user ID is required" });
    }

    await SharedNote.create({ noteId: req.params.id, sharedWithUserId: userId });
    res.json({ message: "Note shared successfully" });
  } catch (error) {
    console.error("❌ Error sharing note:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log("🔍 Searching notes for:", query);

    // Find user-created notes that match the query
    const userNotes = await Note.findAll({
      where: {
        userId: req.user.id,
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    // Find shared notes that match the query
    const sharedNotes = await SharedNote.findAll({
      where: { sharedWithUserId: req.user.id },
      include: [
        {
          model: Note,
          as: "sharedNote",
          where: {
            [Op.or]: [
              { title: { [Op.iLike]: `%${query}%` } },
              { content: { [Op.iLike]: `%${query}%` } },
            ],
          },
        },
      ],
    });

    // Extract shared notes from the response
    const sharedNotesList = sharedNotes.map((s) => s.sharedNote);

    // Combine both lists
    const allNotes = [...userNotes, ...sharedNotesList];

    res.json(allNotes.length ? allNotes : []);
  } catch (error) {
    console.error("❌ Error searching notes:", error);
    res.status(500).json({ error: "Server error" });
  }
};
