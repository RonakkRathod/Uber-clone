import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName :{
            type: String,
            required: true,
            minlength: [3,"First name should be at least 3 characters long"]
        },
        lastName :{
            type: String,
            minlength: [3,"Last name should be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password :{
        type: String,
        required: true,
        minlength: [6,"Password should be at least 6 characters long"],
    },
    socketId: {
        type: String
    },
})

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
    return;
}) 

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id : this._id,
        },
    process.env.AUTH_TOKEN_SECRET,
    {
        expiresIn : process.env.AUTH_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User",userSchema);