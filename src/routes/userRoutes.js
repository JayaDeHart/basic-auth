
const express = require("express")
const { Users } = require("../models/index");
const userRoutes = express.Router();
const signInAuth = require("../auth/signInAuth")
const saltRounds = 10;
const bcrypt = require("bcrypt")

userRoutes.post("/signup", signupHandler);
userRoutes.get("/signin", signInAuth, signInHandler);

async function signupHandler(req, res, next) {
    let { username, password } = req.body;
    let hashedPass;
    try {
        hashedPass = await bcrypt.hash(password, saltRounds);
    } catch (err) {
        next("You need a password!")
    }

    try {
        const newUser = await Users.create({
            username: username,
            password: hashedPass

        })
        res.status(201).json({ newUser })
    } catch (err) {
        next("Could not signup. Try again later")
    }



}

async function signInHandler(req, res, next) {
    res.status(200).json(req.user)
}

module.exports = userRoutes;
