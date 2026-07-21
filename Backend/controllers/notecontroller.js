import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    const note = await Note.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all notes

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      isPinned: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to update a note

export const updateNote = async (req, res) => {
  try {
    const { title, description, isPinned } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user.id) {  // check if user is correct
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this note",
      });
    }

    note.title = title ?? note.title; //   ?? means update title when title is present if "" do not change 
    note.description = description ?? note.description;
    note.isPinned = isPinned ?? note.isPinned;

    await note.save(); // save note

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// now we make deletenote

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this note",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};