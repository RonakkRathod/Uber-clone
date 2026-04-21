import { User } from "../Models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { TokenBlacklist } from "../Models/tokenBlacklist.model.js";

const generateAuthToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const authToken =  user.generateAuthToken()

        return {authToken};

    } catch (error) {
        console.log(error);
        throw new ApiError(500," Something Went Wrong While Generating auth Token");
    }
}

const registerUser = asyncHandler(async (req,res) => {

   // get user data from frontend
   // validation - not empty
   // check if user is already exists: username ,email
   // create user object - create entry in database
   // check for user creation
   // crete token for user
   // return response to frontend

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors Array: ", errors.array()); 
        throw new ApiError(400, "Validation Error", errors.array());
    }

   // get user data from frontend
   const {fullName:{firstName, lastName},email,password} = req.body
    // const {firstName, lastName} = fullName || {};

      //validation check if field are not empty
    if ( [firstName,lastName,email,password].some( (field) => field?.trim() === "" ) ) {
        throw new ApiError(400,"All Fields are Required")
    }

    // check if user already exists
    const existedUser = await User.findOne({email});

    if (existedUser) {
        throw new ApiError(409, "User With email already exists");
    }

    // create user object - create entry in database
    const user = await User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
    })

    if (!user) {
        throw new ApiError(500,"something went wrong while registering user");
    }

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500,"something went wrong while registering user");
    }

    const token = user.generateAuthToken();

      // return response to frontend
    return res.status(201).json(
        new ApiResponse(200, { createdUser, token }, "User Registered Successfully")
    );
})

const loginUser = asyncHandler(async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors Array: ", errors.array()); 
        throw new ApiError(400, "Validation Error", errors.array());
    }

    const {email, password} = req.body

    if(!(email && password)){
        throw new ApiError(401,"Email and Password are required")
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const {authToken} = await generateAuthToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -authToken");

    const options = {
        httpOnly : true,
        secure : true,
        sameSite: "None"
    };

    res.cookie("authToken", authToken, options);
    res.set("Authorization", `Bearer ${authToken}`);

    return res.status(200).json(
        new ApiResponse(200, {authToken, loggedInUser}, "User Logged in Successfully")
    )
})

const getUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "User Profile Fetched Successfully")
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    const authHeader = req.header("Authorization") || "";
    const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    const token = req.cookies?.authToken || bearerToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    const expiresAt = new Date(decoded.exp * 1000);

    await TokenBlacklist.create({ token, expiresAt });

    res.clearCookie("authToken", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(200).json(
        new ApiResponse(200, null, "User logged out successfully")
    );
});



export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}
