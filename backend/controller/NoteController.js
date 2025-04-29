import Note from "../model/NoteModel.js";

export async function getNote(req, res) {
  try {
    const result = await Note.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const inputResult = req.body;
    const newNote = await Note.create(inputResult);
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
    const editNote = req.body;
    const id = req.params.id;

    const [updated] = await Note.update(editNote, { where: { id } });

    if (updated) {
      return res.status(200).json({ message: "Note updated successfully" });
    } else {
      return res.status(404).json({ error: "Note not found" });
    }
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
      res.status(200).json({
        message: "Note deleted successfully",
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
