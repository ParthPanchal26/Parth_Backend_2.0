import { User } from "../models/users.model.js";
import bcrypt from 'bcrypt';
import { sendToken } from "../utils/sendToken.utils.js";

export const register = async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({
        email,
    })

    if (user) return res.status(409).json({
        success: false,
        message: "User Already Exist!",
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    sendToken(user, res, 201, "User signedUp!")

}

export const login = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        email,
    }).select("+password");

    if (!user) return res.status(404).json({
        success: false,
        message: "Invalid credentials!",
    })

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(404).json({
        success: false,
        message: "Incorrect Password!",
    })

    sendToken(user, res, 200, `Welcome, ${user.name}`);

}

export const logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "User deleted!",
    })

}

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

}