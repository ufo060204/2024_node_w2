const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect("mongodb://localhost:27017/testPost")
  .connect(DB)
  .then(() => console.log("資料庫連接成功"))
  .catch((err) => console.log(err));