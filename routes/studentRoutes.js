const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
    var payload = {
        pageTitle: "Student Search"
    };
    res.status(200).render("users/studentSearch", payload);
});

router.get("/register", (req, res, next) => {
    var payload = {
        pageTitle: "Student Registration"
    };
    res.status(200).render("users/studentRegister", payload);
});

router.post("/register", async (req, res, next) => {
    var saitId = req.body.saitId.trim();
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();

    //textarea needs to be trim
    req.body.comments = req.body.comments.trim();

    //console.log("Before: ", req.body);
    var payload = req.body;
    payload.pageTitle = "Student Registration";
    //console.log(payload);

    if(saitId && firstName && lastName) {
        var student = await Student.findOne({ saitId: saitId })
        .catch(err => {
            console.log(err);
            payload.success = false;
            payload.message = "Something went wrong.";
            res.status(200).render("users/studentRegister", payload);
        });

        if (student == null) {
            //No student found
            var data = buildPayload(req.body);
            console.log(data);

            Student.create(data)
            .then(student => {
                payload = {
                    pageTitle: "Student Registration",
                    success: true,
                    message: `New student #${saitId} successfully added.`
                }
                res.status(200).render("users/studentRegister", payload);
            });
        }
        else {
            payload.success = false;
            payload.message = `Provided SAIT ID #${saitId} is already registered.`;
            res.status(200).render("users/studentRegister", payload);
        }
    }
    else {
        payload.success = false;
        payload.message = "Make sure each field has a valid value.";
    }
});

router.get("/info/:studentId", async (req, res, next) => {
    var payload = await getPayload(req.params.studentId);
    payload.pageTitle = "Student Information";
    payload.saitId = req.params.studentId;
    res.status(200).render("users/studentInfo", payload);
});

router.post("/info/:studentId", async (req, res, next) => {
    //textarea needs to be trim
    req.body.comments = req.body.comments.trim();

    var payload = await getPayload(req.params.studentId);

    var student = await Student.findOneAndUpdate({saitId: req.params.studentId}, {$set: req.body}, {new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })

    payload.pageTitle = "Student Information";
    payload.saitId = req.params.studentId;
    payload.success = true;
    payload.message = `#${req.params.studentId} successfully updated.`;
    payload.profileStudent = student;
    res.status(200).render("users/studentInfo", payload);
});

async function getPayload(studentId){
    var student = await Student.findOne({ saitId: studentId });

    if(student == null) {
        return {};
    }

    return {
        profileStudent: student
    }
}

function buildPayload(payload) {

    if(payload.studentServiceType && payload.studentServiceType.includes("EA")){
        payload.eaInfo = {
            academicStatus: payload.academicStatus,
            program: payload.program,
            semester: payload.semester,
            numOfTries: payload.numOfTries,
            comments: payload.ea_comments
        };
    }

    if(payload.studentServiceType && payload.studentServiceType.includes("AS")) {
        payload.asInfo = {
            dateOfBirth: payload.dateOfBirth,
            citizenshipStatus: payload.citizenshipStatus,
            gender: payload.gender,
            homeAddress: payload.homeAddress,
            postalCode: payload.postalCode,
            primaryCode: payload.primaryCode,
            secondaryCode: payload.secondaryCode,
            tertiaryCode: payload.tertiaryCode,
            comments: payload.as_comments,
            emergencyContact: {
                relationship: payload.emerg_relationship,
                fullName: payload.emerg_fullName,
                Phone: payload.emerg_phone
            }      
        }
        ;
    }
    if(payload.studentServiceType && payload.studentServiceType.includes("FA")) {
        payload.faInfo = {
            fundingType: payload.fundingType,
            sin: payload.sin,
            hasIncomeSupport: payload.hasIncomeSupport ? true : false,
            hasEiClaim: payload.hasEiClaim ? true : false,
            hasReducedCrsLoad: payload.hasReducedCrsLoad ? true : false,
            isFundedEsl: payload.isFundedEsl ? true : false,
            eslFundedMonths: payload.eslFundedMonths,
            isFundedAu: payload.isFundedAu ? true : false,
            auFundedMonths: payload.auFundedMonths,
            comments: payload.fa_comments     
        };
    }


    
    return payload;
}

module.exports = router;
