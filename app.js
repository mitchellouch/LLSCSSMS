//main

//commit test by Jinseok Lee, Jan 26. Hi

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//exported route from other.js
const otherRoute = require("./routes/other");
app.use("/other", otherRoute);

//start listening & setup route
app.listen(3000);

//localhost:3000
app.get("/", (req, res) => {
  res.send("This is the login page");
});

//app.post("/", (req, res) => {});

//app.delete("/", (req, res) => {});

//app.patch("/", (req, res) => {});

//hardcode db connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to db...");
});
