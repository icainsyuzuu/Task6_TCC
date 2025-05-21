import Note from "../model/NoteModel.js";

export async function getNote(req, res) {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const id = req.params.id;
    const [updated] = await Note.update(req.body, { where: { id } });
    if (updated) {
      const updatedNote = await Note.findByPk(id);
      return res.status(200).json(updatedNote);
    }
    return res.status(404).json({ error: "Note not found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deleted = await Note.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Note deleted successfully" });
    }
    return res.status(404).json({ error: "Note not found" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
