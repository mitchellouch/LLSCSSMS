const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const Student = require("../models/studentSchema");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
});

router.post("/", async (req, res, next) => {
    
    // listed data below are just sample data to create it, need to change dynamically
    var studentID = "000999990";
    var firstName = "testFName";    //req.body.firstName.trim();
    var lastName = "testFName"; //req.body.lastName.trim();
    var studentPhone = "testPhone";
    var studentEmail = "testEmail@sait.ca";
    var personalEmail = "testEmail@gmail.com";
    var academicStatus = "testStatus";

    if(studentID && firstName && lastName){
        var user = await Student.findOne(
                { studentID: studentID }
        )
        .catch((err) => {
            console.log(err);
        });

        if(user == null){
            // No user found
            var data = {
                studentID: studentID,
                firstName: firstName,
                lastName: lastName,
                studentPhone: studentPhone,
                studentEmail: studentEmail,
                personalEmail: personalEmail,
                academicStatus: academicStatus
            };  //req.body;

            Student.create(data)
            .then((user) => {
                console.log("test student creation succeded");
                return res.redirect("/");
            })
            .catch(error => {
                console.log("test student creation failed");
                console.log(error);
            });
        }
        else {
            // User found
            console.log("Test student is already created");
        }
        
    }
    else {
        alert("unexpected error");
        res.status(200).render("/");
    }

    
});

module.exports = router;