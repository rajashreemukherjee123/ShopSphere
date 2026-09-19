const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");

const checkConnection = require("./database/db");

// const defaultData = require("./default");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});


const router = require("./routes/route");
app.use("/", router);

checkConnection(userName, password);

app.listen(port, host, () => {
  console.log(`Server has started at http://${host}:${port}/`);
});

// defaultData();
