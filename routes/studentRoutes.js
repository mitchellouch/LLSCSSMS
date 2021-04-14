const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const { Schema } = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {

    var payload = {
        pageTitle: "Student Search",
        userLoggedIn: req.session.user
    };
    res.status(200).render("users/studentSearch", payload);
});

router.get("/register", (req, res, next) => {
    var payload = {
        pageTitle: "Student Registration",
        userLoggedIn: req.session.user
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
    //console.log("before: ", payload);

    if(saitId && firstName && lastName) {
        var student = await Student.findOne({ saitId: saitId })
        .catch(err => {
            console.log(err);
            payload.success = false;
            payload.message = "Something went wrong.";
            payload.userLoggedIn = req.session.user;
            res.status(200).render("users/studentRegister", payload);
        });

        if (student == null) {
            //No student found
            var data = buildDataObj(req.body);
            console.log(data);

            Student.create(data)
            .then(student => {
                payload = {
                    pageTitle: "Student Registration",
                    success: true,
                    message: `New student #${saitId} successfully added.`,
                    userLoggedIn: req.session.user
                }
                res.status(200).render("users/studentRegister", payload);
            });
        }
        else {
            payload.success = false;
            payload.message = `Provided SAIT ID #${saitId} is already registered.`;
            payload.userLoggedIn = req.session.user;
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
    payload.userLoggedIn = req.session.user;
    
    //console.log(payload);

    // if(payload.asInfo.dateOfBirth !== undefined){
    //     console.log(payload.asInfo.dateOfBirth);
    //     payload.asInfo.dateOfBirth = formatDate(payload.asInfo.dateOfBirth);
    //     console.log(formatDate(payload.asInfo.dateOfBirth));
    //     console.log(payload.asInfo.dateOfBirth);
    // }   

    res.status(200).render("users/studentInfo", payload);
});

router.post("/info/:studentId", async (req, res, next) => {
    //textarea needs to be trim
    req.body.comments = req.body.comments.trim();

    //var payload = await getPayload(req.params.studentId);
    var payload = {};

    var data = buildDataObj(req.body);
    //console.log("Input Data: ", data);
    
    // decide objects to unset depending on data structure (check it has each section data)
    var unsetObj = {};
    if(data.eaInfo === undefined)
        unsetObj.eaInfo = "";
    if(data.asInfo === undefined)
        unsetObj.asInfo = "";
    if(data.faInfo === undefined)
        unsetObj.faInfo = "";
    
    //console.log(unsetObj);

    var student = await Student.findOneAndUpdate({saitId: req.params.studentId}, {$unset: unsetObj, $set: data}, {new: true})
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
    
    payload.pageTitle = "Student Information";
    payload.saitId = req.params.studentId;
    payload.success = true;
    payload.message = `#${req.params.studentId} successfully updated.`;
    payload.profileStudent = student;
    payload.userLoggedIn = req.session.user;
    //console.log("Result payload: ", payload);
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
    // return student;
}

function buildDataObj(payload) {
    var data = payload;

    if(payload.studentServiceType && payload.studentServiceType.includes("EA")){
        data.eaInfo = {};
        if(payload.academicStatus) data.eaInfo.academicStatus = payload.academicStatus;
        if(payload.numOfTries) data.eaInfo.numOfTries = payload.numOfTries;
        if(payload.refTo) data.eaInfo.refTo = payload.refTo;
        if(payload.refBy) data.eaInfo.refBy = payload.refBy;
        if(payload.ea_comments) data.eaInfo.comments = payload.ea_comments;
    }
    else {
        if(data.eaInfo !== undefined){
            console.log("#####T");
            delete data.eaInfo;
        }
    }

    if(payload.studentServiceType && payload.studentServiceType.includes("AS")) {
        data.asInfo = {};
        if(payload.dateOfBirth) data.asInfo.dateOfBirth = payload.dateOfBirth;
        if(payload.citizenshipStatus) data.asInfo.citizenshipStatus = payload.citizenshipStatus;
        if(payload.gender) data.asInfo.gender = payload.gender;
        if(payload.homeAddress) data.asInfo.homeAddress = payload.homeAddress;
        if(payload.postalCode) data.asInfo.postalCode = payload.postalCode;
        if(payload.primaryCode) data.asInfo.primaryCode = payload.primaryCode;
        if(payload.secondaryCode) data.asInfo.secondaryCode = payload.secondaryCode;
        if(payload.tertiaryCode) data.asInfo.tertiaryCode = payload.tertiaryCode;
        if(payload.as_comments) data.asInfo.comments = payload.as_comments;

        data.asInfo.emergencyContact = {};
        if(payload.emerg_relationship) data.asInfo.emergencyContact.relationship = payload.emerg_relationship;
        if(payload.emerg_fullName) data.asInfo.emergencyContact.fullName = payload.emerg_fullName;
        if(payload.emerg_phone) data.asInfo.emergencyContact.phone = payload.emerg_phone;
    }
    if(payload.studentServiceType && payload.studentServiceType.includes("FA")) {
        data.faInfo = {};

        if(payload.fundingType) data.faInfo.fundingType = payload.fundingType;
        if(payload.sin) data.faInfo.sin = payload.sin;
        if(payload.hasIncomeSupport) data.faInfo.hasIncomeSupport = payload.hasIncomeSupport ? true : false;
        if(payload.hasEiClaim) data.faInfo.hasEiClaim = payload.hasEiClaim ? true : false;
        if(payload.hasReducedCrsLoad) data.faInfo.hasReducedCrsLoad = payload.hasReducedCrsLoad ? true : false;
        if(payload.isFundedEsl) data.faInfo.isFundedEsl = payload.isFundedEsl ? true : false;
        if(payload.isFundedEsl) data.faInfo.eslFundedMonths = payload.eslFundedMonths;
        if(payload.isFundedAu) data.faInfo.isFundedAu = payload.isFundedAu ? true : false;
        if(payload.isFundedAu) data.faInfo.auFundedMonths = payload.auFundedMonths;
        if(payload.fa_comments) data.faInfo.comments = payload.fa_comments;

    }

    return data;
}



module.exports = router;
