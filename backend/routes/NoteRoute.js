import express from "express";
import {
  createNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controller/NoteController.js";

const router = express.Router();

router.get("/notes", getNote);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;
