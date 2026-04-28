import { createRide } from "../utils/ride.js";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const handleCreateRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            new ApiError(400, "Validation error", errors.array())
        );
    }

    const {pickupLocation, destination, vehicleType} = req.body
    
    try {
        const createdRide = await createRide({ userId: req.user._id, pickupLocation, destination, vehicleType });

        if (!createdRide) {
            throw new ApiError(501, "Failed to create ride");
        }

        return res.status(201).json(
            new ApiResponse(201, createdRide, "Ride created successfully")
        );

    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error.message || "Failed to create ride in ride controller");
    }
}

export {
    handleCreateRide
}