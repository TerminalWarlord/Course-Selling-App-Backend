
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
        await User.create({
            email: email,
            name: name,
            password: hashedPassword
        });

    }
    catch (err) {
        return res.status(401).json({ message: "failed" });
    }
    res.json({ message: "Your account has been created!" });
}


const signIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res.status(401).json({ message: "User doesn't exist!" });
    }

    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
        return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET);
    res.json({ message: "Successfully logged in!", token: token });
}

module.exports = {
    signUp,
    signIn
}