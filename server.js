const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
// const path = require("path");
const PORT = process.env.PORT || 9000;
// const db = require("./src/model/user");
const dbUri = process.env.ATLAS_URI;
const mongoose = require("mongoose");

const user = require("./src/controllers/index");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use("/api", user);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
