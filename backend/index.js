import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

const app = express();

app.use(
  cors({
    origin: "https://h-08-451505.uc.r.appspot.com",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", NoteRoute);
app.use("/api/auth", AuthRoute);

app.get("/", (req, res) => {
  res.send("Helo world! Aplikasi Notes berjalan dengan baik.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
