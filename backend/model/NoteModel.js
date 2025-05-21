import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Note = db.define(
  "catat",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "catatan",
  }
);

db.sync().then(() => console.log("Database synced"));

export default Note;
