const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    saitId: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    studentPhone: String,
    studentEmail: String,
    personalEmail: String,
    program: String,
    semester: Number,
    comments: String,
    eaInfo: {
        academicStatus: String,
        numOfTries: Number,
        refTo: String,
        refBy: String,
        comments: String
    },
    asInfo: {
        dateOfBirth: Date,
        citizenshipStatus: String,
        gender: String,
        homeAddress: String,
        postalCode: String,
        primaryCode: String,
        secondaryCode: String,
        tertiaryCode: String,
        comments: String,
        emergencyContact: {
            relationship: String,
            fullName: String,
            phone: String,
        },
    },
    faInfo: {
        fundingType: String,
        sin: String,
        hasIncomeSupport: Boolean,
        hasEiClaim: Boolean,
        hasReducedCrsLoad: Boolean,
        isFundedEsl: Boolean,
        eslFundedMonths: Number,
        isFundedAu: Boolean,
        auFundedMonths: Number,
        comments: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);