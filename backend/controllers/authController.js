const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function signup(req, res) {
    try {
        const { email, orgPassword, confirmPassword } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "Please enter email" });
        }
        if (!orgPassword) {
            return res.status(400).json({ error: true, message: "Please enter password" });
        }
        if (!confirmPassword) {
            return res.status(400).json({ error: true, message: "Please enter confirm password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "The user Aldready exist" });
        }

        if (orgPassword !== confirmPassword) {
            return res.status(400).json({ error: true, message: "Both the password must be same" });
        }

        const hashedPassword = await bcrypt.hash(orgPassword, 10);
        const newUser = await User.create({ email, orgPassword: hashedPassword });
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "36000m" });

        return res.status(200).json({ message: "Registration successfully", email, token, user: newUser });
    } catch (err) {
        res.status(400).json(err.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "Please enter email" });
        }
        if (!password) {
            return res.status(400).json({ error: true, message: "Please enter password" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: true, message: "User does not exist" });
        }

        console.log(existingUser);

        const isPasswordValid = await bcrypt.compare(password, existingUser.orgPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ error: true, message: "Invalid password" });
        }

        if (existingUser && isPasswordValid) {
            const user = { id: existingUser._id, email: existingUser.email };
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "36000m" });
            return res.status(200).json({ error: false, message: "Login successfull", user, token });
        } else {
            return res.status(400).json({ error: true, message: "Login failed" });
        }
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = { signup, login };
