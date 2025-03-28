import User from "../models/user.model.js";

export const getUsers = async (req, res,next) => {
    try {
        const users = await User.find({})

        res.status(200).json({
            message:"Users found",
            data: users
        })
    }catch(err){
        next(err)
    }
}
export const getUser = async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json({
            message:"Users found",
            data: user
        })
    }catch(err){
        next(err)
    }
}