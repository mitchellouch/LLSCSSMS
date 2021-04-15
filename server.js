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
    secret: process.env.SECRET_KEY, //secret keyword
    resave: true,
    saveUninitialized: false,
  })
);

//exported route from other.js
const studentRoute = require("./routes/studentRoutes");
const loginRoute = require("./routes/loginRoutes");
const logoutRoute = require("./routes/logoutRoutes");
const registerRoute = require("./routes/registerRoutes");
const appointmentRoute = require("./routes/appointmentRoutes");
const workshopRoute = require("./routes/workshopRoutes");
const mainpageRoute = require("./routes/mainpageRoutes");
const adminRoute = require("./routes/adminRoutes");
const { CLIENT_RENEG_LIMIT } = require("tls");

//API routes
const studentsApiRoute = require("./routes/api/students");
const saitProgramsApiRoute = require("./routes/api/saitPrograms");
const appointmentsApiRoute = require("./routes/api/appointments");
const workshopsApiRoute = require("./routes/api/workshops");
const adminApiRoute = require("./routes/api/admin");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/mainpage", middleware.requireLogin, mainpageRoute);
app.use("/appointment", middleware.requireLogin, appointmentRoute);
app.use("/student", middleware.requireLogin, studentRoute);
app.use("/workshop", middleware.requireLogin, workshopRoute);
app.use("/admin", middleware.requireAdmin, adminRoute);
app.use("/logout", middleware.requireLogin, logoutRoute);

app.use("/api/students", middleware.requireLogin, studentsApiRoute);
app.use("/api/saitPrograms", saitProgramsApiRoute);
app.use("/api/appointments", middleware.requireLogin, appointmentsApiRoute);
app.use("/api/workshops", middleware.requireLogin, workshopsApiRoute);
app.use("/api/admin", middleware.requireAdmin, adminApiRoute);

//start listening & setup route
const port = process.env.PORT || 3000;
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
