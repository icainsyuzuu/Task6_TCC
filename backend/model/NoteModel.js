import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Note = db.define(
  "catat",
  {
    title: Sequelize.STRING,
    category: Sequelize.STRING,
    content: Sequelize.STRING,
  },
  {
    timestamps: false,
    tableName: "catatan",
  }
);

db.sync().then(() => console.log("Database synced"));
export default Note;
