//main

//commit test by Jinseok Lee, Jan 26. Hi2
//commit test by Sungjoon An, Feb 09. "Hii"

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("./database");
require("dotenv/config");
const middleware = require("./middleware/auth");
const session = require("express-session");

// Pug default setting
app.set("view engine", "pug");
app.set("views", "views");

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
const studentInfoRoute = require("./routes/studentInfoRoutes");
const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const mainpageRoute = require("./routes/mainpageRoutes");
const { CLIENT_RENEG_LIMIT } = require("tls");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/mainpage", mainpageRoute);
app.use("/student", middleware.requireLogin, studentInfoRoute);

//start listening & setup route
const port = 3000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

//localhost:3000
app.get("/", middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: "Main Page",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("users/mainpage", payload);
});

//app.post("/", (req, res) => {});

//app.delete("/", (req, res) => {});

//app.patch("/", (req, res) => {});
