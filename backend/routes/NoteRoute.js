import express from "express";
import {
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controller/NoteController.js";

const router = express.Router();
router.get("/", getNote);
router.post("/add-notes", createNote);
router.put("/update-notes/:id", updateNote);
router.delete("/delete-notes/:id", deleteNote);

export default router;
