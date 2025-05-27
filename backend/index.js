// import express from "express";
// import cors from "cors";
// import NoteRoute from "./routes/NoteRoute.js";

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api", NoteRoute);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import NoteRoute from "./routes/NoteRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", NoteRoute);
app.use("/api/auth", AuthRoute);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "127.0.0.1", () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
