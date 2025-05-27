import express from "express";
import { login, register } from "../controller/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;

router.post("/login", (req, res) => {
  console.log("Login route accessed");
  res.json({ message: "Login route works" });
});

