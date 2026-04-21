import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.model.js";
import { TokenBlacklist } from "../Models/tokenBlacklist.model.js";


// create  a middleware to verify JWT token
export const authUser = asyncHandler(async (req ,res ,next) => {
  try {

   const authHeader = req.header("Authorization") || "";
   const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
   const token =  req.cookies?.authToken || bearerToken
  
     if(!token){
        throw new ApiError(401, "Unauthorized request")
     }
      
   const isBlacklisted = await TokenBlacklist.findOne({ token });

     if (isBlacklisted) {
        throw new ApiError(401, "Token has been revoked");
     }

   const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET)
  
    const user =  await User.findById(decodedToken?._id).select("-password -authToken")
  
     if (!user) {   
        throw new ApiError(401,"Invalid Access Token");
     }
  
     req.user = user;
     next();
  
  } catch (error) {
     throw new ApiError(401, error?.message || "Inavlid Access Token");
  }
  
})