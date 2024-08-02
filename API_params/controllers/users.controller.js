import { User } from "../models/users.model.js";

export const getAllUsers = async (req, res) => {

    // Fetching Parameters from URL
    // const ulrParametersObject = req.query;
    // console.log(ulrParametersObject);

    const userScope = await User.find({});

    res.json({
        success: true,
        userScope,
    })
}

export const register = async (req, res) => {

    const { username, email, password } = req.body;

    await User.create({
        username,
        email,
        password,
    })

    res.json({
        success: true,
        message: 'SignUp successfully',
    });
}

export const specialFunc = (req, res) => {
    res.json({
        success: true,
        message: "Static route called!",
    })
}

export const getParam = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        user,
    })
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        message: "User Updated!",
    })
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    // await user.remove();
    await user.deleteOne({})

    res.json({
        success: true,
        message: "User deleted!",
    })
}