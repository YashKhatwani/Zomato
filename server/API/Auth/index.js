//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Models
import { UserModel } from "../../database/user/index";

const Router = express.Router();

/*
Route           /signup
Description     Register new user
Params          none
Access          Public
Method          Post
*/

Router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        //check wether email exists
        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ email: "User alredy exists!" });
        }

        //hash password
        //encrypt pass word 8 times
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);

        //Save to database
        await UserModel.create({
            ...req.body.credentials,
            password: hashedPassword,
        });

        //generate JWT tokens - for session storage
        const token = jwt.sign({ user: { fullname, email } }, "ZomatoApp");

        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
