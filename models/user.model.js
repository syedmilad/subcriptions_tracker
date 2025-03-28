import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User name is required"],
        trim: true,
        minLength: 5,
        maxLength: 50,
    },
    email:{
        type:String,
        required:[true,"User Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:6
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;