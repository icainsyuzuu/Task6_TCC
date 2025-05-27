// import { Sequelize } from "sequelize";
// const db = new Sequelize("note", "root", "cantik", {
//   host: "34.46.192.156",
//   dialect: "mysql",
// });

// export default db;

import { Sequelize } from "sequelize";

const db = new Sequelize("note", "root", "", {
  host: "127.0.0.1", // pakai IPv4 explicit
  dialect: "mysql",
  port: 3307,
  logging: false, // opsional supaya log lebih bersih
});

export default db;
