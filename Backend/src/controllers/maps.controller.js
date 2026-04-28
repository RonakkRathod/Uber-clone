import {getAddressCordinates, getDistanceTime, getAddressSuggestions} from '../utils/maps.js'
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import {validationResult} from 'express-validator';

const getCordinates = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            new ApiError(400, "Validation error", errors.array())
        );
    }
    
    const { address } = req.query;

    try {
        const coordinates = await getAddressCordinates(address);
        res.status(200).json(
            new ApiResponse(200, coordinates, "Coordinates retrieved successfully")
        )
    } catch (error) {
        const statusCode = error?.statusCode || 500;
        res.status(statusCode).json(
            new ApiError(statusCode, error.message || "Failed to retrieve coordinates")
        );
    }
}

const getDistance = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
                new ApiError(400, "Validation error", errors.array())
            );
        }

        const { origin, destination } = req.query;

        const originCoordinates = await getAddressCordinates(origin);
        const destinationCoordinates = await getAddressCordinates(destination);

        const distanceTime = await getDistanceTime(originCoordinates, destinationCoordinates);

        if (!distanceTime) {
            throw new ApiError(501, "Failed to calculate distance and time");
        }

        res.status(200).json(
            new ApiResponse(200, distanceTime, "Distance and time retrieved successfully")
        );
    } catch (error) {
        const statusCode = error?.statusCode || 500;
        res.status(statusCode).json(
            new ApiError(statusCode, error.message || "Failed to retrieve distance and time")
        );
    }
}

const getSuggestions = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(
            new ApiError(400, "Validation error", errors.array())
        );
    }

    const { input } = req.query;

    try {
        const suggestions = await getAddressSuggestions(input);
        res.status(200).json(
            new ApiResponse(200, suggestions, "Address suggestions retrieved successfully")
        );
    } catch (error) {
        const statusCode = error?.statusCode || 500;
        res.status(statusCode).json(
            new ApiError(statusCode, error.message || "Failed to retrieve address suggestions")
        );
    }
}

export {
    getCordinates,
    getDistance,
    getSuggestions
}