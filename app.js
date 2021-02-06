//main

//commit test by Jinseok Lee, Jan 26. Hi2

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
require("dotenv/config");
const middleware = require("./middleware/auth");
const session = require("express-session");

// HTML default setting
app.set("view engine", "ejs");
app.engine("pug", require("ejs").renderFile);

// application uses
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(
  session({
    secret: "capstone llsc 2021", //secret keyword
    resave: true,
    saveUninitialized: false,
  })
);

//exported route from other.js
const studentRoute = require("./routes/studentRoutes");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const mainpageRoute = require("./routes/mainpageRoutes");
app.use("/student", studentRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/mainpage", mainpageRoute);

//start listening & setup route
app.listen(3000);

//localhost:3000
app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Main Page",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/mainpage.html", payload);
});

//app.post("/", (req, res) => {});

//app.delete("/", (req, res) => {});

//app.patch("/", (req, res) => {});

//hardcode db connection
// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
//   console.log("Connected to db...");
// });
