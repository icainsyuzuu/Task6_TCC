import { DataTypes } from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

export default User;
