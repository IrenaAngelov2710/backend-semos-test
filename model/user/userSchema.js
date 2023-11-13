const mongoose = require("mongoose");
//* npm i validator - za proverka i validacija na podatocite vneseni od strana na korisnikot
const validator = require("validator");
//* npm i bcryptjs - za kriptiranje na password-ot
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "E-mail is required."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid e-mail."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlenght: [6, "Password must be at least 6 charachters long."],
        validate: [validator.isStrongPassword, "Please provide a strong password."]
    },
});


//* Middelware za hashiranje na password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;