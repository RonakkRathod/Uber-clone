import { Captain } from "../Models/captain.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TokenBlacklist } from "../Models/tokenBlacklist.model.js";

const generateAuthToken = async (userId) => {
    try {
        const captain = await Captain.findById(userId)
        const authToken =  captain.generateAuthToken()

        return {authToken};

    } catch (error) {
        console.log(error);
        throw new ApiError(500," Something Went Wrong While Generating auth Token");
    }
}


const registerCaptain = asyncHandler(async (req,res) => {

   // get captain data from frontend
   // validation - not empty
   // check if captain is already exists: username ,email
   // create captain object - create entry in database
   // check for captain creation
   // crete token for captain   
   // return response to frontend

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors Array: ", errors.array()); 
        throw new ApiError(400, "Validation Error in captain registration", errors.array());
    }

   // get captain data from frontend
   const {fullName:{firstName, lastName},email,password,vehicle:{color, plate, capacity, vehicleType}} = req.body

    //validation check if field are not empty
    if ( [firstName,lastName,email,password,color,plate,capacity,   vehicleType].some( (field) => field?.trim() === "" ) ) {
        throw new ApiError(400,"All Fields are Required")
    }

    // check if captain already exists
    const existedCaptain = await Captain.findOne({email});

    if (existedCaptain) {
        throw new ApiError(409, "Captain With email already exists");
    }

    // create captain object - create entry in database
    const captain = await Captain.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    if (!captain) {
        throw new ApiError(500,"something went wrong while registering user");
    }

    const createdCaptain = await Captain.findById(captain._id).select("-password");

    if (!createdCaptain) {
        throw new ApiError(500,"something went wrong while registering captain");
    }

    const captainToken = captain.generateAuthToken();

      // return response to frontend
    return res.status(201).json(
        new ApiResponse(200, { createdCaptain, captainToken }, "Captain Registered Successfully")
    );
})

const loginCaptain = asyncHandler(async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors Array: ", errors.array()); 
        throw new ApiError(400, "Validation Error", errors.array());
    }

    const {email, password} = req.body

    if(!(email && password)){
        throw new ApiError(401,"Email and Password are required")
    }

    const captain = await Captain.findOne({email})

    if (!captain) {
        throw new ApiError(404, "Captain not found");
    }

    const isPasswordValid = await captain.comparePassword(password);

    if (!isPasswordValid) {``
        throw new ApiError(401, "Invalid password");
    }

    const {authToken} = await generateAuthToken(captain._id);

    const loggedInCaptain = await Captain.findById(captain._id).select("-password -authToken");

    const options = {
        httpOnly : true,
        secure : true,
        sameSite: "None"
    };

    res.cookie("authToken", authToken, options);
    res.set("Authorization", `Bearer ${authToken}`);

    return res.status(200).json(
        new ApiResponse(200, {authToken, loggedInCaptain}, "Captain Logged in Successfully")
    )
})

const getCaptainProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.captain, "Captain Profile Fetched Successfully")
    )
})

const logoutCaptain = asyncHandler(async (req, res) => {
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
        new ApiResponse(200, null, "Captain logged out successfully")
    );
});

export {
    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}
