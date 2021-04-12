/*
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    saitId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    request: {
        type: boolean,
        required: true,
    },
}, { timestamps: true });

var User = mongoose.model("User", UserSchema);
module.exports = User;

**/