const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const PORT = process.env.PORT || 9000;

const contacts = require("./src/controllers/index");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", contacts);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
