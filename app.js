//main

//commit test by Jinseok Lee, Jan 26. Hi

const express = require("express");
const app = express();
//const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('./database');
require("dotenv/config");

// HTML default setting
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// application uses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

//exported route from other.js
const studentRoute = require("./routes/studentRoutes");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
app.use("/student", studentRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

//start listening & setup route
app.listen(3000);

//localhost:3000
app.get("/", (req, res) => {
  res.send(
    "This is the main page <br/> <a href='/login'>Move to Login Page</a>"
  );
});

//app.post("/", (req, res) => {});

//app.delete("/", (req, res) => {});

//app.patch("/", (req, res) => {});

//hardcode db connection
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
//   console.log("Connected to db...");
// });
