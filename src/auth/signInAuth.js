const base64 = require("base-64");
const { Users } = require("../models/index");
const bcrypt = require("bcrypt");

async function signInAuth(req, res, next) {

    if (!req.headers.authorization) {
        next("You are not authenticated")
    }
    let authHeader;
    let username;
    let password;

    try {
        authHeader = base64.decode(req.headers.authorization.split(" ")[1]);
        username = authHeader.split(":")[0]
        password = authHeader.split(":")[1]
    } catch (err) {
        next(err)
    }



    //does a user with this username exist?
    let user;
    try {
        user = await Users.findOne({ where: { username: username } })
    } catch (err) {
        next("No such user")
    }

    //do they have the right password?

    try {
        const authBool = bcrypt.compare(password, user.password);
        if (authBool) {
            req.user = user
            next();
        } else {
            next("Incorrect credentials")
        }
    } catch (err) {
        next("Incorrect credentials")
    }



}

module.exports = signInAuth