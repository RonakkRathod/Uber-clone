import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName :{
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true           
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType: {
            type: String,
            enum: ["car", "motorcycle", "autoRickshaw"],
            required: true
        }
    },
    location: {
        lat: {
            type: Number,
        },
        log: {
            type: Number,
        }
    }
})


captainSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10)
    return;
}) 

captainSchema.methods.generateAuthToken = function () {
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

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

export const Captain = mongoose.model("Captain",captainSchema)