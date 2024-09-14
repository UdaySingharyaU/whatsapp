import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
const userController = {
    signUp: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    status: false,
                    message: "User Already Exist",
                })
            }
            const newUser = await User({
                email,
                password
            })
            const hashPassword = await bcrypt.hash(password, 10);
            newUser.password = hashPassword;
            await newUser.save();
            return res.status(201).json({
                status: true,
                message: "User Created Successfully",
                data: newUser,
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }
    },

    login: async (req, res) => {
        try {
            const existUser = await User.findOne({ email: req.body.email });
            if (!existUser) {
                return res.status(200).json({
                    status: false,
                    message: "User doest not exist",
                })
            }
            const isMatch = await bcrypt.verify(existUser, req.body.password);
            if (!isMatch) {
                return res.status(400).json({
                    status: false,
                    message: "Password is Incorrect"
                })
            }
            const details = {
                id: existUser._id,
                email: existUser.email
            }
            const token = await Jwt.sign(
                { details },
                process.env.secret,
                { expiresIn: '1d' }
            )
            return res.status(200).json({
                status: true,
                message: "Login Succcessfull",
                data: {
                    user: existUser,
                    token: token
                }
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }
    },

    completeProfile: async (req, res) => {
        try {
            const profile = await User.findById({ _id: req.user.id });
            if (!profile) {
                return res.status(400).json({
                    status: false,
                    message: "User Does Not Exist",
                })
            }
            const { ...updateData } = req.body;
            const updateProfile = await User.findByIdAndUpdate({ _id: req.user.id }, updateData, { news: true });
            if (!updateProfile) {
                return res.status(400).json({
                    status: false,
                    message: "User Not Exist",
                })
            }
            return res.status(200).json({
                status:true,
                message:"User profile Updated Successfully",
                data:updateProfile
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }

    }
}


export default userController;