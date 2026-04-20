import { User } from "../Models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";

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
//    const {firstName, lastName} = fullName || {};

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

    const token = user.generateAuthToken();

      // return response to frontend
    return res.status(201).json(
        new ApiResponse(200, { user, token }, "User Registered Successfully")
    );
})


export {
    registerUser,
}
