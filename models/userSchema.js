//also a kind of middleware between controller and the database
//can define a schema and do some validation before writing to the database
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
    },
    phone: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
    request: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

var User = mongoose.model("User", UserSchema);
module.exports = User;