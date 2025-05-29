import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

const app = express();

// Konfigurasi CORS khusus
app.use(
  cors({
    origin: "https://h-05-450908.uc.r.appspot.com",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", NoteRoute);
app.use("/api/auth", AuthRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
