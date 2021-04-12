/*
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Student = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const { Schema } = require("mongoose");

router.get("/", (req, res, next) => {
    var payload = {
        pageTitle: "Admin Search"
    };
    res.status(200).render("users/adminSearch", payload);
});

router.get("/register", (req, res, next) => {
    var payload = {
        pageTitle: "Admin Registration"
    };
    res.status(200).render("users/adminRegister", payload);
});
**/