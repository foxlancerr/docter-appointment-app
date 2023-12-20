import express from "express"
import User from "../model/user.model.js"
import { generateAccessToken } from "../utils/accessToken.js";
// import { decrptPassword, hashedPassward } from "../utils/passwordHashed.js";

const router = express.Router();

router.route('/signup').post(async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, email } = req.body;

        if (username.length === 0) {
            res.json({ message: "username is required", success: false });
            return
        }
        if (email.length === 0) {
            res.json({ message: "email is required", success: false })
            return
        }
        if (password.length === 0) {
            res.json({ message: "password is required", success: false })
            return
        }


        const userPresent = await User.findOne({ email: email });
        if (userPresent) {
            res.status(404).json({ message: "user is already exist", success: false })
            return
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        res.status(200).json({ message: "New user created successfully", success: true })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false })
    }
})


router.route('/signin')
    .post(async (req, res) => {
        const { username, password } = req.body;
        // res.json(req.body)

        if (username.length === 0) {
            res.json({ message: "username is required", success: false })
            return
        }
        if (password.length === 0) {
            res.json({ message: "password is required", success: false })
            return
        }

        try {
            const userValid = await User.findOne({
                email: email
            })

            console.log(userValid);
            if (!userValid) {
                return res.status(404).json({ message: "No User is found with this Email !", success: false })
            }

            const passwordAuth = await userValid.isPasswordCorrect(password)
            if (!passwordAuth) {
                return res.status(404).json({ "message": "password is incorrect", success: false })
            }

            const token = generateAccessToken(userValid._id, userValid.email, userValid.username)

            res.status(200).json({ "message": "user is successfully Login", token, success: true })
        } catch (err) {
            res.json({ "message": err.message, success: false })
        }

    })


export default router;