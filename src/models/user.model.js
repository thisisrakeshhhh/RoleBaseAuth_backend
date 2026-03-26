//all the type of data will be store in data 
//and schema is the structure of the data
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "artist", "admin"],
        default: "user"
    }
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;