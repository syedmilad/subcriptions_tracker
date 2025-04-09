import mongoose from "mongoose";
import {JWT_EXPIRED_IN, JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();

    try {
        // logic to create user
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 404;
            throw error;
        }
        const existing = await User.findOne({email})
        console.log({"Email Existing": existing})
        if (existing) {
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }
        // Hash Password
        const salt = await bcrypt.genSalt(5);
        const hashPass = await bcrypt.hash(password, salt)
        const newUsers = await User.create([{name, email, password: hashPass}], {session})
        console.log("newUsers testing...", newUsers)

        // JWT token for client
        const token = await jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRED_IN});

        await session.commitTransaction()
        await session.endSession()

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token: token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {

        const {email, password} = req.body;
        if (!email || !password) {
            const error = new Error("All fields are required");
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findOne({email})
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isValidPassword = await bcrypt.compare(password, user?.password)
        if (!isValidPassword) {
            const error = new Error("Passwords do not match")
            error.statusCode = 401;
            throw error;
        }

        // token JWT
        const token = await jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRED_IN});

        return res.status(200).json({
            message: "User sign in successfully",
            data: {
                token: token,
                user: user
            }
        })
    } catch (err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {
}















