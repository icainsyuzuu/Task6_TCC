import { Sequelize } from "sequelize";
const db = new Sequelize("note", "root", "cantik", {
  host: "34.46.192.156",
  dialect: "mysql",
});

export default db;

// import { Sequelize } from "sequelize";
// const db = new Sequelize("note", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// export default db;
